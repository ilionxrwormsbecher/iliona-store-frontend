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

const MainContent = styled.main`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 2 / 12;
    margin: 3.2rem 0;
    flex-direction: column;
`;

const CategoryPackages = ({ intl }: WrappedComponentProps) => {
    const packages = useSelector((state: IReduxApplicationState) => state.packagesSlice);
    const categories = useSelector((state: IReduxApplicationState) => state.categorySlice);
    const [categoriesWithPackages, setCategoriesWithPackages] = useState<IlionaPackageByCategory[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        if (packages.errorMessage === "duplicate entry" || packages.packageInstallSuccessful) {
            dispatch(removePackageError());
        }
    }, [packages.errorMessage, packages.packageInstallSuccessful]);

    let showSpinner = false;
    let showError = false;

    const pathNameAsArray = location?.pathname.split("/");
    const routeUrlFriendlyName = pathNameAsArray[pathNameAsArray.length - 1];

    useEffect(() => {
        if (packages.ilionaPackages && packages?.ilionaPackages.length === 0) {
            dispatch(fetchIlionaPackages());
        }
    }, [dispatch]);

    useEffect(() => {
        if (categories?.categories && categories?.categories.length === 0) {
            dispatch(fetchIlionaCategories());
        }
    }, [dispatch]);

    useEffect(() => {
        if (packages.computerNameError === "Computer name not found") {
            return navigate("notallowed");
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

    if (packages?.isFetching) {
        showSpinner = true;
    }

    if (packages?.errorMessage) {
        showError = true;
    }

    const errorText = intl.formatMessage({
        id: "errormessages.general",
        defaultMessage: "Er is iets fout gegaan, probeer het later opnieuw.",
    });

    const errorMessage = <Alert variant="danger">{errorText}</Alert>;

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
            {showError && <div data-testid="error">{errorMessage}</div>}
            {!showSpinner && !showError && content}
        </MainContent>
    );
};

export default injectIntl(CategoryPackages);
