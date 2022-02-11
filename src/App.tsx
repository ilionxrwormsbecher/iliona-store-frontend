import React, { useEffect, useState } from "react";
import { Route,  Routes } from "react-router-dom";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import styled, { ThemeProvider } from "styled-components";
import { HeaderComponent as Header } from "./components/header/Header";
import { HeaderBar } from "./components/headerBar/HeaderBar";
import Nav from "./components/nav/Nav";
import { Home } from "./pages/Home";
import { history } from "./store/store";
import { IntlProvider } from "react-intl"

import { ilionxTheme } from "./themes/ilionx";
import { themeSelector } from "./themes/themeSelector";
import { translationSets } from "./i18n/translations";
import { PackageDetail } from "./pages/PackageDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchIlionaCategories } from "./store/slices/categories/categoryActions";
import { Alert } from "react-bootstrap";
import { IReduxApplicationState } from "./models/redux/IReduxApplicationState";
import { Spinner } from "./components/spinner/Spinner";

const Main = styled.main`
    width: 100%;
    grid-row: 5 / 6;
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: 6.4rem repeat(10, 1fr) 6.4rem;
`;

const MainContent = styled.main`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 2 / 12;
    margin: 3.2rem 0;
    flex-direction: column;
`;

const Wrapper = styled.div`
    color: ${ p => p.theme.primaryTextColor};
`


function App() {
    const [theme, setTheme] = useState(ilionxTheme);
    const dispatch = useDispatch();
    const categories = useSelector((state: IReduxApplicationState) => state.categorySlice);
    let showError = false;
    
    useEffect(() => {
        setTheme(themeSelector("ilionx"));
        dispatch(fetchIlionaCategories());
    }, []);

    const errorMessage = (
        <Alert variant='danger'>
            Er is iets fout gegaan,probeer het later opnieuw
        </Alert>
    )
    if (categories?.errorMessage) {
        showError = true;
    }

    // const multiRoute = (element: JSX.Element, paths: string[] , ...rest: any) =>  {
    //     return (
    //         <>
    //             {Array.isArray(paths) ? paths.map((path) =>
    //                 <Route path={path} {...rest} element={(props: any)  => <Element {...props} />} />
    //             ) :
    //                 <Route path={paths} {...rest} element={props => <Element {...props} />} />
    //             }
    //         </>
    //     );
    // }

// parent route elements. See the note about <Outlet> below. */}
// <Routes>
//   <Route path="/" element={<Layout />}>
//     {['a', 'b', 'c'].map((path) => (
//       <Route key="Home" path={path} element={<Home testing={path} />} />
//     ))}
//     <Route index element={<Home />} />
//     <Route path="about" element={<About />} />
//     <Route path="dashboard" element={<Dashboard />} />

//     {/* Using path="*"" means "match anything", so this route
//           acts like a catch-all for URLs that we don't have explicit
//           routes for. */}
//     <Route path="*" element={<NoMatch />} />
//   </Route>
// </Routes>

    
    return (
        <>
            {/* <ReactKeycloakProvider
                authClient={ keycloak }
                initOptions={ { onLoad: "login-required" } }
            > */}

            <ThemeProvider theme={ theme }>
                <IntlProvider locale={'nl'} messages={translationSets['en']}>
                    <Router history={ history }>
                        <Wrapper>
                            <HeaderBar />
                            <Header background="/assets/img/logo_ggd.jpg" />
                            <Nav />
                            <Main>
                                { categories.isFetching ? <MainContent><Spinner /></MainContent>  : ''}
                                { showError && !categories.isFetching ? <MainContent>{errorMessage}</MainContent> : (
                                    <Routes>
                                        <Route path="/detail/:rowkey" element={ <PackageDetail /> } />
                                        <Route path="/" element={ <Home /> } />
                                    </Routes>
                                )}
                            </Main>
                        </Wrapper>
                    </Router>
                </IntlProvider>
            </ThemeProvider>
            {/* </ReactKeycloakProvider> */}
        </>
    );
}

export default App;
