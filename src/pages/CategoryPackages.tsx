import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import CategoriesPackages from "../components/categoryPackages/CategoriesPackages";
import { Spinner } from "../components/spinner/Spinner";
import { IlionaPackageByCategory } from "../models/IilionaPackagesByCategory";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import { fetchIlionaPackages, removePackageError } from "../store/slices/packages/packagesActions";
import { filterPackagesPerCategory } from "../utils/orderPackagesByCategory";
import { fetchIlionaCategories } from "../store/slices/categories/categoryActions";
import { ErrorMessagesEnum } from "../models/errorsEnum";

const MainContent = styled.main`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 2 / 12;
    margin: 3.2rem 0;
    flex-direction: column;
`;

const CategoryPackages = ({ intl }: WrappedComponentProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();

    const [showSpinner, setShowSpinner] = useState(true);
    const packages = useSelector((state: IReduxApplicationState) => state.packagesSlice);
    const categories = useSelector((state: IReduxApplicationState) => state.categorySlice);
    const [categoriesWithPackages, setCategoriesWithPackages] = useState<IlionaPackageByCategory[]>([]);

    const pathNameAsArray = location?.pathname.split("/");
    const routeUrlFriendlyName = pathNameAsArray[pathNameAsArray.length - 1];

    useEffect(() => {
        if (packages.errorMessage === ErrorMessagesEnum.duplicatePackage || packages.packageInstallSuccessful) {
            dispatch(removePackageError());
        }
    }, [packages.errorMessage, packages.packageInstallSuccessful]);

    useEffect(() => {
        if (packages.ilionaPackages && packages?.ilionaPackages.length === 0) {
            dispatch(fetchIlionaPackages(packages?.subscriptionKey));
        }
    }, [dispatch]);

    useEffect(() => {
        if (categories?.categories && categories?.categories.length === 0) {
            dispatch(fetchIlionaCategories(packages?.subscriptionKey));
        }
    }, [dispatch]);

    useEffect(() => {
        if (packages.computerNameError === ErrorMessagesEnum.noCSAClientFound) {
            return navigate("/notallowed", { replace: true });
        }
    }, [packages.computerNameError]);

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

    if (packages?.locallyInstalledPackages.length > 0 && showSpinner) {
        setShowSpinner(false);
    }

    const packagesForCurrentRoute = categoriesWithPackages.filter((cat: IlionaPackageByCategory) => {
        if (cat.name.toLowerCase() === routeUrlFriendlyName) return cat;
    });

    const content =
        packagesForCurrentRoute.length > 0 ? (
            <CategoriesPackages
                categories={categories?.categories}
                packagesByCategory={packagesForCurrentRoute}
                localPackages={packages?.locallyInstalledPackages}
            ></CategoriesPackages>
        ) : (
            <div data-testid="noPackagesAvailable"></div>
        );

    return (
        <MainContent>
            {showSpinner && <Spinner />}

            {packages?.errorMessage && (
                <div data-testid="error">
                    <Alert variant="danger">
                        <FormattedMessage
                            id="errormessages.general"
                            defaultMessage="Er is iets fout gegaan, probeer het later opnieuw."
                        ></FormattedMessage>
                    </Alert>
                    ;
                </div>
            )}

            {!showSpinner && !packages?.errorMessage && content}
        </MainContent>
    );
};

export default injectIntl(CategoryPackages);
