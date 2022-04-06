import React, { useEffect, useState } from "react";
import { Spinner } from "../components/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import { fetchComputerName, fetchIlionaPackages, removePackageError } from "../store/slices/packages/packagesActions";
import { Alert } from "react-bootstrap";
import { IlionaPackageByCategory } from "../models/IilionaPackagesByCategory";
import CategoriesPackages from "../components/categoryPackages/CategoriesPackages";
import { filterPackagesPerCategory } from "../utils/orderPackagesByCategory";
import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl";
import { fetchIlionaCategories } from "../store/slices/categories/categoryActions";
import { useNavigate } from "react-router-dom";
import { ErrorMessagesEnum } from "../models/errorsEnum";

const MainContent = styled.div`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 2 / 12;
    margin: 3.2rem 0;
    flex-direction: column;
`;

const Home = ({ intl }: WrappedComponentProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const packages = useSelector((state: IReduxApplicationState) => state.packagesSlice);
    const categories = useSelector((state: IReduxApplicationState) => state.categorySlice);
    const [categoriesWithPackages, setCategoriesWithPackages] = useState<IlionaPackageByCategory[]>([]);
    const [showSpinner, setShowSpinner] = useState(true);
    const errorMessageComputername = useSelector(
        (state: IReduxApplicationState) => state.packagesSlice.computerNameError
    );

    useEffect(() => {
        dispatch(fetchComputerName());
    }, [dispatch]);

    useEffect(() => {
        if (packages.errorMessage === ErrorMessagesEnum.duplicatePackage || packages.packageInstallSuccessful) {
            dispatch(removePackageError());
        }
    }, [packages.errorMessage, packages.packageInstallSuccessful]);

    useEffect(() => {
        dispatch(fetchIlionaPackages());
        if (categories?.categories && categories.categories.length === 0) {
            dispatch(fetchIlionaCategories());
        }
    }, [dispatch]);

    useEffect(() => {
        if (errorMessageComputername === ErrorMessagesEnum.noCSAClientFound) {
            return navigate("/notallowed", { replace: true });
        } else {
            setShowSpinner(false);
        }
    }, [errorMessageComputername, packages.computerName]);

    useEffect(() => {
        if (
            packages?.ilionaPackages &&
            packages?.ilionaPackages.length > 0 &&
            categories?.categories &&
            categories?.categories.length > 0
        ) {
            setCategoriesWithPackages(filterPackagesPerCategory(categories?.categories, packages?.ilionaPackages));
        }
    }, [packages?.ilionaPackages, categories?.categories]);

    return (
        <MainContent data-testid="wrapper">
            {(showSpinner && <Spinner />) || (!packages.computerName && <Spinner />)}

            {!showSpinner && packages?.errorMessage && (
                <Alert variant="danger">
                    <FormattedMessage
                        id="errormessages.general"
                        defaultMessage="Er is iets fout gegaan, probeer het later opnieuw."
                    ></FormattedMessage>
                </Alert>
            )}

            {!showSpinner && packages.computerName && (
                <CategoriesPackages
                    packagesByCategory={categoriesWithPackages}
                    categories={categories?.categories}
                    localPackages={packages?.locallyInstalledPackages}
                ></CategoriesPackages>
            )}
        </MainContent>
    );
};

export default injectIntl(Home);
