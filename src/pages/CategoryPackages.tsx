import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CategoriesPackages from "../components/categoryPackages/CategoriesPackages";
import { Spinner } from "../components/spinner/Spinner";
import { IlionaPackageByCategory } from "../models/IilionaPackagesByCategory";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import { fetchIlionaPackages } from "../store/slices/packages/packagesActions";
import { checkObjectIsEmpty } from "../utils/general";
import { filterPackagesPerCategory } from "../utils/orderPackagesByCategory";

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
    const routerState = useSelector((state: IReduxApplicationState) => state.router?.location?.pathname);
    const [categoriesWithPackages, setCategoriesWithPackages] = useState<IlionaPackageByCategory[]>([]);
    const dispatch = useDispatch();

    let routeUrlFriendlyName = "";

    let showSpinner = false;
    let showError = false;
    if (routerState) {
        const pathNameAsArray = routerState.split("/");
        routeUrlFriendlyName = pathNameAsArray[pathNameAsArray.length - 1];
    }

    useEffect(() => {
        if (checkObjectIsEmpty(packages?.ilionaPackages)) {
            dispatch(fetchIlionaPackages());
        }
    }, []);

    useEffect(() => {
        if (packages?.ilionaPackages.length > 0 && categories?.categories.length > 0) {
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
            <CategoriesPackages packagesByCategory={packagesForCurrentRoute}></CategoriesPackages>
        ) : (
            <div data-testid="noPackagesAvailble">{errorText}</div>
        );

    return (
        <MainContent>
            {showSpinner && <Spinner />}
            {showError && errorMessage}
            {!showSpinner && !showError && content}
        </MainContent>
    );
};

export default injectIntl(CategoryPackages);
