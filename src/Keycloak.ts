import Keycloak from "keycloak-js";

// @ts-ignore
const keycloak = new Keycloak({
    clientId: process.env.REACT_APP_CLIENTID!,
    realm: process.env.REACT_APP_REALM!,
    url: process.env.REACT_APP_URL
});

export default keycloak;
