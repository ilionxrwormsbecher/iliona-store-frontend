import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import styled, { ThemeProvider } from "styled-components";
import { HeaderComponent as Header } from "./components/header/Header";
import { HeaderBar } from "./components/headerBar/HeaderBar";
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
import { history } from "./store/store";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { ilionxTheme } from "./themes/ilionx";
import { themeSelector } from "./themes/themeSelector";
import PackageDetail from "./pages/PackageDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchIlionaCategories } from "./store/slices/categories/categoryActions";
import { Alert } from "react-bootstrap";
import { IReduxApplicationState } from "./models/redux/IReduxApplicationState";
import { Spinner } from "./components/spinner/Spinner";
import CategoryPackages from "./pages/CategoryPackages";
import AddPackage from "./components/AddPackage";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { fetchComputerName, fetchLocalPackages, fetchSubscriptionKey } from "./store/slices/packages/packagesActions";
import NotAllowed from "./pages/NotAllowed";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/errorComponent/ErrorFallback";

const Main = styled.main`
    width: 100%;
    grid-row: 5 / 6;
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: 6.4rem repeat(10, 1fr) 6.4rem;
`;

const MainContent = styled.section`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 2 / 12;
    margin: 3.2rem 0;
    flex-direction: column;
`;

const Wrapper = styled.div`
    color: ${(p) => p.theme.primaryTextColor};
`;

function App({ intl }: WrappedComponentProps) {
    const [theme, setTheme] = useState(ilionxTheme);
    const categories = useSelector((state: IReduxApplicationState) => state.categorySlice);
    const computerName = useSelector((state: IReduxApplicationState) => state.packagesSlice.computerName);
    const packagesError = useSelector((state: IReduxApplicationState) => state.packagesSlice.errorMessage);
    const dispatch = useDispatch();

    let showError = false;

    useEffect(() => {
        setTheme(themeSelector("ilionx"));
        dispatch(fetchIlionaCategories());
        dispatch(fetchComputerName());
        dispatch(fetchSubscriptionKey());
    }, []);

    useEffect(() => {
        if (computerName) {
            dispatch(fetchLocalPackages(computerName));
        }
    }, [computerName]);

    const errorText = intl.formatMessage({
        id: "errormessages.general",
        defaultMessage: "Er is iets fout gegaan, probeer het later opnieuw.",
    });

    const errorMessage = <Alert variant="danger">{errorText}</Alert>;
    if (categories?.errorMessage) {
        showError = true;
    }

    return (
        // <ReactKeycloakProvider
        //     authClient={ keycloak }
        //     initOptions={ { onLoad: "login-required" } }
        // >
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <Wrapper>
                    <HeaderBar />
                    <Header background="/assets/img/logo_ggd.jpg" />
                    <Nav categories={categories.categories} />
                    <Main>
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            {/* {categories.isFetching && (
                                <MainContent data-testid="app-spinner">
                                    <Spinner />
                                </MainContent>
                            )} */}
                            {showError && !categories.isFetching ? (
                                <MainContent>{errorMessage}</MainContent>
                            ) : (
                                <Routes>
                                    <Route path="/categorie/:catName" element={<CategoryPackages />} />
                                    <Route path="/details/:rowkey" element={<PackageDetail />} />
                                    <Route path="/packages/add" element={<AddPackage />} />
                                    <Route path="/notAllowed" element={<NotAllowed />} />
                                    <Route path="/" element={<Home />} />
                                </Routes>
                            )}
                        </ErrorBoundary>
                        ;
                    </Main>
                </Wrapper>
            </Router>
        </ThemeProvider>
        // </ReactKeycloakProvider>
    );
}

export default injectIntl(App);
