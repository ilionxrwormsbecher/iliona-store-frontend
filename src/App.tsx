import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import React from "react";
import { BrowserRouter,  Route,  Routes } from "react-router-dom";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { Header } from "./components/header/Header";
import { HeaderBar } from "./components/headerBar/HeaderBar";
import Nav from "./components/nav/Nav";
import keycloak from "./Keycloak";
import { Home } from "./pages/Home";
import { history } from "./store/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/stylesheets/default.scss";

function App() {

    return (
        <div className="page-wrapper">
            <ReactKeycloakProvider
                authClient={ keycloak }
                initOptions={ { onLoad: "login-required" } }
            >


                <Router history={ history }>
                    <HeaderBar />
                    <Header background="/assets/img/logo_ggd.jpg" id="logo" />
                    <Nav />
                    <main>
                        <Routes>
                            <Route path="/" element={ <Home /> } />
                        </Routes>
                    </main>
                </Router>
            </ReactKeycloakProvider>
        </div>
    );
}

export default App;
