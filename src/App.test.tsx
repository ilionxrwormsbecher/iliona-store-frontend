import { screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import { rest } from "msw";
import React from "react";
import { IntlProvider } from "react-intl";

import App from "./App";
import { translationSets } from "./i18n/translations";
import { abbreviatedPackagesMOCK, categoriesMOCK } from "./mock/mockData";
import { server } from "./mock/server";
import { renderWithoutRouter } from "./utils/tests/customRender";

function setupTest() {
    renderWithoutRouter(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <App />
        </IntlProvider>
    );
}

test("Should render a spinner when the categories are loading", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: categoriesMOCK,
                })
            );
        })
    );

    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/list`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: [],
                })
            );
        })
    );

    setupTest();
    const appContainer = screen.getByTestId("app-spinner");
    const globalSpinner = within(appContainer).getByTestId("spinner");

    expect(globalSpinner).toBeInTheDocument();
});

test("Should render routes when there is no error and the page isn't loading.", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: categoriesMOCK,
                })
            );
        })
    );

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

    await waitForElementToBeRemoved(() => screen.getAllByTestId("spinner"));
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).not.toBeEmptyDOMElement();
});

test("Should render an error when categories could not be fetched", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(
                ctx.status(404),
                ctx.json({
                    errorMessage: `Unexpected error`,
                })
            );
        })
    );

    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/list`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: [],
                })
            );
        })
    );

    setupTest();

    await waitForElementToBeRemoved(() => screen.getAllByTestId("spinner"));
    // // const appContainer = screen.getByTestId("app-spinner");
    // // const globalSpinner = within(appContainer).getByTestId("spinner");
    screen.logTestingPlaygroundURL();

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert.innerHTML).toMatchInlineSnapshot(`"Er is iets fout gegaan, probeer het later opnieuw."`);
});
