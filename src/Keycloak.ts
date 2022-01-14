import Keycloak from "keycloak-js";

// @ts-ignore
const keycloak = new Keycloak({
    url: process.env.REACT_APP_URL,
    realm: process.env.REACT_APP_REALM!,
    clientId: process.env.REACT_APP_CLIENTID!
});

export default keycloak;