import { ReactKeycloakProvider } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";
import { Route,  Routes } from "react-router-dom";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import styled, { ThemeProvider } from "styled-components";
import { HeaderComponent as Header } from "./components/header/Header";
import { HeaderBar } from "./components/headerBar/HeaderBar";
import Nav from "./components/nav/Nav";
import keycloak from "./Keycloak";
import { Home } from "./pages/Home";
import { history } from "./store/store";
import { IntlProvider } from "react-intl"

import { ilionxTheme } from "./themes/ilionx";
import { themeSelector } from "./themes/themeSelector";
import { translationSets } from "./i18n/translations";
import { PackageDetail } from "./pages/PackageDetail";

const Main = styled.main`
    width: 100%;
    grid-row: 5 / 6;
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: 6.4rem repeat(10, 1fr) 6.4rem;
`;

const Wrapper = styled.div`
    color: ${ p => p.theme.primaryTextColor};
`


function App() {
    const [theme, setTheme] = useState(ilionxTheme);
    
    useEffect(() => {
        setTheme(themeSelector("ilionx"));
    }, []);
    
    return (
        <>
            <ReactKeycloakProvider
                authClient={ keycloak }
                initOptions={ { onLoad: "login-required" } }
            >

                <ThemeProvider theme={ theme }>
                    <IntlProvider locale={'nl'} messages={translationSets['en']}>
                        <Router history={ history }>
                            <Wrapper>
                                <HeaderBar />
                                <Header background="/assets/img/logo_ggd.jpg" />
                                <Nav />
                                <Main>
                                    <Routes>
                                        <Route path="/detail/:rowkey" element={ <PackageDetail /> } />
                                        <Route path="/" element={ <Home /> } />
                                    </Routes>
                                </Main>
                            </Wrapper>
                        </Router>
                    </IntlProvider>
                </ThemeProvider>
            </ReactKeycloakProvider>
        </>
    );
}

export default App;
