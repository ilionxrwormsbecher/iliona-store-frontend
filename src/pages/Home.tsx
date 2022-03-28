import React, { useEffect, useState } from "react";
import { Spinner } from "../components/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import { fetchIlionaPackages, removePackageError } from "../store/slices/packages/packagesActions";
import { Alert } from "react-bootstrap";
import { IlionaPackageByCategory } from "../models/IilionaPackagesByCategory";
import CategoriesPackages from "../components/categoryPackages/CategoriesPackages";
import { filterPackagesPerCategory } from "../utils/orderPackagesByCategory";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { fetchIlionaCategories } from "../store/slices/categories/categoryActions";

const MainContent = styled.div`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 2 / 12;
    margin: 3.2rem 0;
    flex-direction: column;
`;

const Home = ({ intl }: WrappedComponentProps) => {
    const packages = useSelector((state: IReduxApplicationState) => state.packagesSlice);
    const categories = useSelector((state: IReduxApplicationState) => state.categorySlice);
    const [categoriesWithPackages, setCategoriesWithPackages] = useState<IlionaPackageByCategory[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (packages.errorMessage === "duplicate entry" || packages.packageInstallSuccessful) {
            dispatch(removePackageError());
        }
    }, [packages.errorMessage, packages.packageInstallSuccessful]);

    let showSpinner = false;
    let showError = false;
    let content;

    const errorText = intl.formatMessage({
        id: "errormessages.general",
        defaultMessage: "Er is iets fout gegaan, probeer het later opnieuw.",
    });

    useEffect(() => {
        dispatch(fetchIlionaPackages());
        if (categories?.categories && categories.categories.length === 0) {
            dispatch(fetchIlionaCategories());
        }
    }, [dispatch]);

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

    const errorMessage = <Alert variant="danger">{errorText}</Alert>;

    content = (
        <CategoriesPackages
            packagesByCategory={categoriesWithPackages}
            categories={categories?.categories}
            localPackages={packages?.locallyInstalledPackages}
        ></CategoriesPackages>
    );

    return (
        <MainContent data-testid="wrapper">
            {showSpinner && <Spinner />}
            {!showSpinner && showError && errorMessage}
            {!showSpinner && content}
        </MainContent>
    );
};

export default injectIntl(Home);
