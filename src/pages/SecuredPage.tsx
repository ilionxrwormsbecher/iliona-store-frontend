import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect } from "react";

const Secured = () => {
  const { keycloak, initialized } = useKeycloak();

  console.log(keycloak.token);

  return (
    <div>
      <h1 className="text-black text-4xl">Secured app store</h1>
    </div>
  );
};

export default Secured;
