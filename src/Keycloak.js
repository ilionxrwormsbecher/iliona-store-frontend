import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    clientId: process.env.REACT_APP_CLIENTID,
    realm: process.env.REACT_APP_REALM,
    url: process.env.REACT_APP_URL,
});

// keycloak.createLoginUrl({
//     idpHint: "reactauth",
// });

export default keycloak;
