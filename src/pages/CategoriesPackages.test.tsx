import React from "react";
import { IntlProvider } from "react-intl";
import { translationSets } from "../i18n/translations";
import { renderWithoutReducer, screen, waitForElementToBeRemoved } from "../utils/tests/customRender";
import CategoryPackages from "./CategoryPackages";
import { server } from "../mock/server";
import { rest } from "msw";
import { abbreviatedPackagesMOCK, categoriesMOCK } from "../mock/mockData";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
    useLocation: () => ({
        pathname: "/multimedia",
    }),
}));

function setupTest() {
    renderWithoutReducer(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <CategoryPackages />
        </IntlProvider>
    );
}

test("should render an message when there are no packages available.", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: [],
                })
            );
        })
    );

    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/list/`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: [],
                })
            );
        })
    );

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
    screen.debug();
    const noPackagesNode = screen.getByTestId("noPackagesAvailable");
    expect(noPackagesNode).toBeInTheDocument();
});

test("should render a spinner when the packages are being retrieved.", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/list/`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: abbreviatedPackagesMOCK,
                })
            );
        })
    );

    setupTest();
    const spinnerNode = screen.getByTestId("spinner");

    expect(spinnerNode).not.toBeNull();
});

test("should render the category title correctly", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/list/`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: abbreviatedPackagesMOCK,
                })
            );
        }),
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: categoriesMOCK,
                })
            );
        })
    );

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
    // const headingNode = screen.getByRole("heading", { level: 1 });
    // expect(headingNode.innerHTML).toEqual("Multimedia");
});

// // test("should render an error message when something has gone wrong.", async () => {
// //     server.use(
// //         rest.get(`https://api.iliona.cloud/store-packages/list/`, (req, res, ctx) => {
// //             return res(
// //                 ctx.status(404),
// //                 ctx.json({
// //                     errorMessage: `Unexpected error`,
// //                 })
// //             );
// //         })
// //     );

// //     setupTest();
// //     await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
// //     screen.debug();
// //     const errorNode = screen.getByRole("alert");

// //     expect(errorNode.innerHTML).toBe("Er is iets fout gegaan, probeer het later opnieuw.");
// // });

// test("should render an error when the categories are unavailable.", async () => {
//     server.use(
//         rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
//             return res(
//                 ctx.status(404),
//                 ctx.json({
//                     errorMessage: `Unexpected error`,
//                 })
//             );
//         })
//     );

//     setupTest();
//     await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
//     const errorNode = screen.getAllByRole("alert");

//     expect(errorNode.length).toBe(2);
// });
