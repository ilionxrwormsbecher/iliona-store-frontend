export function useKeycloak() {
    const token = "A random string that is non zero length";
    const userProfile = { email: "test@testdomain.com", firstName: "Test", lastName: "User", username: "test" };
    const realmAccess = { roles: ["admin", "auditor", "user"] };
    let authenticated = false;

    const authClient = {
        authenticated,
        hasRealmRole() {
            return true;
        },
        hasResourceRole() {
            return true;
        },
        idToken: token,
        initialized: true,
        loadUserProfile() {
            return Promise.resolve({ userProfile });
        },
        login() {
            authenticated = true;
        },
        logout() {
            authenticated = false;
        },
        profile: userProfile,
        realm: "DemoRealm",
        realmAccess,
        refreshToken: token,
        token
    };
    return { initialized: true, keycloak: authClient };
}
