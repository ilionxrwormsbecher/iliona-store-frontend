import { ReactKeycloakProvider } from "@react-keycloak/web";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HeaderBar } from "./components/HeaderBar";
import Nav from "./components/Nav";
import PrivateRoute from "./helpers/PrivateRoute";
import keycloak from "./Keycloak";

import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/SecuredPage";
import { Unauthorized } from "./pages/Unauthorized";
import "./styles/stylesheets/default.scss";

function App() {
  return (
    <div className="page-wrapper">
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: "login-required" }}
      >
        <HeaderBar />
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <WelcomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/secured"
              element={
                <PrivateRoute>
                  <SecuredPage />
                </PrivateRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </BrowserRouter>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
