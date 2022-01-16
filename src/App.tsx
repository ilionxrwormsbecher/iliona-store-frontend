import { ReactKeycloakProvider } from "@react-keycloak/web";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { HeaderBar } from "./components/HeaderBar";
import keycloak from "./Keycloak";

import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/SecuredPage";
import { Unauthorized } from "./pages/Unauthorized";
import "./styles/stylesheets/default.scss";

function App() {
    return (
        <div className="page-wrapper">
            <ReactKeycloakProvider
                authClient={ keycloak }
                initOptions={ { onLoad: "login-required" } }
            >
                <HeaderBar />
                <Header background="/assets/img/logo_ggd.jpg" id="logo" />
                <BrowserRouter>
                    <main>
                        <Routes>
                            <Route
                                path="/"
                                element={ <WelcomePage /> }
                            />
                            <Route
                                path="/secured"
                                element={ <SecuredPage /> }
                            />
                            <Route path="/unauthorized" element={ <Unauthorized /> } />
                        </Routes>
                    </main>
                </BrowserRouter>
            </ReactKeycloakProvider>
        </div>
    );
}

export default App;
