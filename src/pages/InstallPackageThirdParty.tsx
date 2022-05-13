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
import { checkObjectIsEmpty } from "../utils/general";

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
`;

const TitleWrapper = styled.div`
    margin: 32px 32px 0 32px; ;
`;

const FormContent = styled.div`
    display: flex;
    flex-direction: row;
`;

const FormWrapper = styled.div`
    display: inline-flex;
    width: calc(60% - 64px);
    padding: 32px;
    flex-direction: column;
`;

const ErrorLine = styled.p`
    color: darkred;
    font-style: italic;
    margin-bottom: 4px;
`;

const Textbox = styled.input`
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${(p) => p.theme.primaryTextColor};
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-bottom: 24px;

    &:focus-visible {
        outline: -webkit-focus-ring-color 1px;
        outline-color: ${(p) => p.theme.primaryColor};
        outline-style: auto;
        outline-width: 1px;
    }
    &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #999;
        opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #999;
    }

    &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #999;
    }
`;
const Label = styled.label`
    display: block;
    margin-bottom: 4px;
`;

const SubmitButton = styled.input.attrs({
    type: "submit",
    value: "Submit",
})`
    padding: 4px 64px;
    background-color: ${(p) => p.theme.primaryColor};
    color: white;
    outline: none;
    border: none;
    font-size: 14px;
    margin-top: 16px;

    &:disabled {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
    }
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

    // const checkWhetherIsIcoAdmin = async () => {
    //     const requestHeaders: any = new Headers();
    //     requestHeaders.set("Content-Type", "application/json");
    //     requestHeaders.set("x-api-key", packages?.subscriptionKey);

    //     const result = await fetch(`${process.env.REACT_APP_API_URL}is-admin`, {
    //         method: "GET",
    //         headers: requestHeaders,
    //     });

    //     const allowed = await result.json();

    //     if (!allowed) return navigate("/notallowed", { replace: true });
    // };

    const {
        register,
        handleSubmit,
        setValue,
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

            // const adminCheckResult = checkWhetherIsIcoAdmin();
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
                                            onClick={() => setIsSilentInstall(!isSilentInstall)}
                                            type="checkbox"
                                            name="isSilentInstall"
                                            value={isSilentInstall.toString()}
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
                                            onClick={() => setConfirm(!confirm)}
                                            type="checkbox"
                                            name="confirm"
                                            value={confirm.toString()}
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
