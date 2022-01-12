import { useKeycloak } from "@react-keycloak/web";
import React from "react";

export const Unauthorized = () => {
  const { keycloak, initialized } = useKeycloak();
  return (
    <div>
      <h1>
        you are not logged in and therefore unauthorized to view this resource.
      </h1>
      {!keycloak.authenticated && (
        <button
          type="button"
          className="text-blue-800"
          onClick={() => keycloak.login()}
        >
          Login
        </button>
      )}

      {!!keycloak.authenticated && (
        <button
          type="button"
          className="text-blue-800"
          onClick={() => keycloak.logout()}
        >
          Logout ({keycloak?.tokenParsed?.preferred_username})
        </button>
      )}
    </div>
  );
};
