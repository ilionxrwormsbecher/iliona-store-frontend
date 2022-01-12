import { useKeycloak } from "@react-keycloak/web";
import React from "react";

const Nav = () => {
  const { keycloak, initialized } = useKeycloak();
  return (
    <div>
      <div className="top-0 w-full flex flex-wrap">
        <section className="x-auto">
          <nav className="flex justify-between bg-gray-200 text-blue-800 w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <h1 className="text-3xl font-bold font-heading">
                Keycloak React AUTH.
              </h1>
              <ul>
                <li>
                  <a className="hover:text-blue-800" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue-800" href="/secured">
                    Secured Page
                  </a>
                </li>
              </ul>
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
          </nav>
        </section>
      </div>
    </div>
  );
};

export default Nav;
