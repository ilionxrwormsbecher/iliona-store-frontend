import { ReactKeycloakProvider } from "@react-keycloak/web";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import PrivateRoute from "./helpers/PrivateRoute";
import keycloak from "./Keycloak";

import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/SecuredPage";
import { Unauthorized } from "./pages/Unauthorized";

function App() {
  return (
    <div>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: "login-required" }}
      >
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
