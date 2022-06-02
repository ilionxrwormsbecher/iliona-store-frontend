import { useKeycloak } from "@react-keycloak/web";
import { FC } from "react";

const ProtectedRoute: FC<any> = ({ children }) => {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children : null;
};

export default ProtectedRoute;
