import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const { keycloak } = useKeycloak();
    let navigate = useNavigate();

    const isLoggedIn = keycloak.authenticated;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/unauthorized");
        }
    }, [isLoggedIn, navigate]);


    return children;
};

export default PrivateRoute;
