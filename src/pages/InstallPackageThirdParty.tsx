import React, { useEffect, useState } from "react";
import { Spinner } from "../components/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import {
    fetchComputerName,
    fetchIlionaPackages,
    InstallPackage,
    removePackageError,
} from "../store/slices/packages/packagesActions";
import { Alert } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl";
import { fetchIlionaCategories } from "../store/slices/categories/categoryActions";
import { useNavigate } from "react-router-dom";
import { ErrorMessagesEnum } from "../models/errorsEnum";
import { screenSize } from "../themes/global";
import { Header1 } from "../components/html/header/Header";
import { useForm } from "react-hook-form";
import { checkObjectIsEmpty, checkWhetherIsIcoAdmin } from "../utils/general";
import { ErrorLine, FormContent, FormWrapper, Label, SubmitButton, Textbox } from "../styles/shared/formStyles";

const schema = yup
    .object({
        packageName: yup.string().required(),
        computerName: yup.string().required(),
    })
    .required();

const InstallPackageWrapper = styled.div`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 1 / 13;
    flex-direction: column;

    @media ${screenSize.tablet} {
        grid-column: 2 / 12;
        margin: 3.2rem 0;
    }

    @media ${screenSize.desktop} {
        grid-column: 4 / 10;
        margin: 3.2rem 0;
    }

    input[type="checkbox"] {
        accent-color: ${(p) => p.theme.primaryColor};
    }
`;

const TitleWrapper = styled.div`
    margin: 32px 32px 0 32px; ;
`;

const InstallPackageThirdParty = ({ intl }: WrappedComponentProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState<boolean>(false);
    const [isSilentInstall, setIsSilentInstall] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showInstallSuccess, setShowInstallSuccess] = useState<boolean>(false);

    const packages = useSelector((state: IReduxApplicationState) => state.packagesSlice);
    const categories = useSelector((state: IReduxApplicationState) => state.categorySlice);
    const [showSpinner, setShowSpinner] = useState(true);
    const errorMessageComputername = useSelector(
        (state: IReduxApplicationState) => state.packagesSlice.computerNameError
    );

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    const onSubmit = () => {
        dispatch(
            InstallPackage(
                getValues("packageName"),
                getValues("computerName"),
                isSilentInstall,
                packages?.subscriptionKey,
                "install-package-on-computer"
            )
        );

        reset({
            packageName: "",
            computerName: "",
        });
        setConfirm(false);
        setIsSilentInstall(false);
    };

    useEffect(() => {
        dispatch(fetchComputerName());
    }, [dispatch]);

    useEffect(() => {
        if (packages?.subscriptionKey != "") {
            dispatch(fetchIlionaPackages(packages?.subscriptionKey));
            if (categories?.categories && categories.categories.length === 0 && packages?.subscriptionKey !== "") {
                dispatch(fetchIlionaCategories(packages?.subscriptionKey));
            }

            checkWhetherIsIcoAdmin(packages?.subscriptionKey, navigate);
        }
    }, [dispatch, packages?.subscriptionKey]);

    useEffect(() => {
        if (errorMessageComputername === ErrorMessagesEnum.noCSAClientFound) {
            return navigate("/notallowed", { replace: true });
        } else {
            setShowSpinner(false);
        }
    }, [errorMessageComputername, packages.computerName]);

    if (packages?.errorMessage && !showAlert) {
        dispatch(removePackageError());
        setShowAlert(true);
        setShowInstallSuccess(false);
    }

    if (packages?.packageInstallSuccessful && !showInstallSuccess) {
        dispatch(removePackageError());
        setShowAlert(false);
        setShowInstallSuccess(true);
    }

    return (
        <>
            {(showSpinner && <Spinner />) || (!packages.computerName && <Spinner />)}

            <InstallPackageWrapper>
                {!showSpinner && showAlert && (
                    <Alert variant="danger" className="mb-4" dismissible onClose={() => setShowAlert(false)}>
                        <FormattedMessage
                            id="errormessages.general"
                            defaultMessage="Er is iets fout gegaan, probeer het later opnieuw."
                        ></FormattedMessage>
                    </Alert>
                )}

                {!showSpinner && showInstallSuccess && !packages?.errorMessage && (
                    <Alert variant="success" className="mb-4" dismissible onClose={() => setShowInstallSuccess(false)}>
                        Het pakket {getValues("packageName")} wordt geinstalleerd op {getValues("computerName")}
                    </Alert>
                )}

                {!showSpinner && packages.computerName && (
                    <div style={{ background: "#fff" }}>
                        <TitleWrapper>
                            <Header1>Install a package</Header1>
                        </TitleWrapper>
                        <form onSubmit={handleSubmit(() => onSubmit())}>
                            <FormContent>
                                <FormWrapper>
                                    <div>
                                        <Label htmlFor="packageName">Pakketnaam</Label>
                                        {errors.packageName && (
                                            <ErrorLine role="alert" aria-label="pakketnaam">
                                                De pakketnaam is vereist
                                            </ErrorLine>
                                        )}
                                        <Textbox
                                            {...register("packageName")}
                                            id="packageName"
                                            name="packageName"
                                            placeholder="Naam van package"
                                            autoFocus
                                            tabIndex={1}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="computerName">Computernaam</Label>
                                        {errors.computerName && (
                                            <ErrorLine role="alert" aria-label="computernaam">
                                                De computernaam is vereist
                                            </ErrorLine>
                                        )}
                                        <Textbox
                                            {...register("computerName")}
                                            id="computerName"
                                            name="computerName"
                                            placeholder="Computernaam"
                                            tabIndex={2}
                                        />
                                    </div>

                                    <Label
                                        htmlFor="isSilentInstall"
                                        style={{
                                            display: "inline-block",
                                            marginRight: "32px",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        <input
                                            onChange={() => setIsSilentInstall(!isSilentInstall)}
                                            type="checkbox"
                                            name="isSilentInstall"
                                            value={isSilentInstall.toString()}
                                            checked={isSilentInstall}
                                            id="isSilentInstall"
                                            style={{ display: "inline-block" }}
                                            tabIndex={3}
                                        />
                                        &nbsp;
                                        <span>Toon toast notificatie na installatie</span>
                                    </Label>

                                    <Label
                                        htmlFor="confirm"
                                        style={{
                                            display: "inline-block",
                                            marginRight: "32px",
                                        }}
                                    >
                                        <input
                                            onChange={() => setConfirm(!confirm)}
                                            type="checkbox"
                                            name="confirm"
                                            value={confirm.toString()}
                                            checked={confirm}
                                            id="confirm"
                                            style={{ display: "inline-block" }}
                                            tabIndex={4}
                                        />
                                        &nbsp;
                                        <span>
                                            Weet u zeker dat u package "{getValues("packageName")}" op computer "
                                            {getValues("computerName")}" wilt installeren?
                                        </span>
                                    </Label>

                                    <SubmitButton
                                        customText="Installeer package"
                                        disabled={
                                            !checkObjectIsEmpty(errors) ||
                                            !confirm ||
                                            getValues("packageName") == "" ||
                                            getValues("computerName") == ""
                                        }
                                    />
                                </FormWrapper>
                            </FormContent>
                        </form>
                    </div>
                )}
            </InstallPackageWrapper>
        </>
    );
};

export default injectIntl(InstallPackageThirdParty);
