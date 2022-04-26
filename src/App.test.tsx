import { screen, waitFor, waitForElementToBeRemoved, within } from "@testing-library/react";
import { rest } from "msw";
import React from "react";
import { IntlProvider } from "react-intl";

import App from "./App";
import { translationSets } from "./i18n/translations";
import { abbreviatedPackagesMOCK, categoriesMOCK, localPackagesMOCK } from "./mocks/mockData";
import { server } from "./mocks/server";
import { renderWithoutReducer } from "./utils/tests/customRender";

function setupTest() {
    renderWithoutReducer(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <App />
        </IntlProvider>,
        false
    );
}

test("Should render the wrapper component within the page", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: categoriesMOCK,
                })
            );
        }),
        rest.get(`https://api.iliona.cloud/store-packages/list`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: [],
                })
            );
        }),
        rest.get(`http://127.0.0.1:10001/computer`, (req, res, ctx) => {
            return res(
                ctx.json({
                    computer_name: "8GGY4Y2_IL",
                })
            );
        }),
        rest.get(`http://localhost:10001/localpackages`, (req, res, ctx) => {
            return res(ctx.json(localPackagesMOCK));
        })
    );

    setupTest();
    const appContainer = await screen.getByTestId("wrapper");
    expect(appContainer).toBeInTheDocument();
});

test("Should render routes when there is no error and the page isn't loading.", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: categoriesMOCK,
                })
            );
        }),
        rest.get(`https://api.iliona.cloud/store-packages/list/`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: abbreviatedPackagesMOCK,
                })
            );
        }),
        rest.get(`http://127.0.0.1:10001/computer`, (req, res, ctx) => {
            return res(
                ctx.json({
                    computer_name: "8GGY4Y2_IL",
                })
            );
        }),
        rest.get(`http://localhost:10001/localpackages`, (req, res, ctx) => {
            return res(ctx.json(localPackagesMOCK));
        })
    );

    setupTest();

    await waitForElementToBeRemoved(() => screen.getAllByTestId("spinner"));
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).not.toBeEmptyDOMElement();
});

// test("Should render an error when categories could not be fetched", async () => {
//     server.use(
//         rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
//             return res(
//                 ctx.status(404),
//                 ctx.json({
//                     errorMessage: `Unexpected error`,
//                 })
//             );
//         }),
//         rest.get(`http://127.0.0.1:10001/subscriptionkey`, (req, res, ctx) => {
//             return res(ctx.json({ subscription_key: "6d24a9eaea9a4ce1a598e1402494aaaa" }));
//         }),
//         rest.get(`https://api.iliona.cloud/store-packages/list`, (req, res, ctx) => {
//             return res(
//                 ctx.json({
//                     data: [],
//                 })
//             );
//         }),
//         rest.get(`http://127.0.0.1:10001/computer`, (req, res, ctx) => {
//             return res(
//                 ctx.json({
//                     computer_name: "8GGY4Y2_IL",
//                 })
//             );
//         }),
//         rest.get(`http://localhost:10001/localpackages`, (req, res, ctx) => {
//             return res(ctx.json(localPackagesMOCK));
//         })
//     );

//     setupTest();

//     await waitForElementToBeRemoved(() => screen.getAllByTestId("spinner"));

//     screen.logTestingPlaygroundURL();
//     const alert = await screen.getByRole("alert");
//     expect(alert).toBeInTheDocument();
//     expect(alert.innerHTML).toMatchInlineSnapshot(`"Er is iets fout gegaan, probeer het later opnieuw"`);
// });
