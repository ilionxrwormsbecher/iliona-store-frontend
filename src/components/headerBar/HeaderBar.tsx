import { useKeycloak } from "@react-keycloak/web";
import React from "react";

export const HeaderBar = () => {

    const { keycloak } = useKeycloak();
    return (
        <div className="topbar-section">
            <div className="brand">
                <img src="/assets/img/logo.png" alt="ilionx logo" />
            </div>


            <div className="logged-in-container"  role="region">
                <p className="logged-in-username " >{ keycloak?.tokenParsed?.preferred_username }</p>
                <div  className="login-avatar">
                </div>

            </div>
        </div>
    );
};
