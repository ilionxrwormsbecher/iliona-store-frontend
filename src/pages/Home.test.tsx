import { screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import React from "react";
import { IntlProvider } from "react-intl";
import { translationSets } from "../i18n/translations";
import { renderWithoutReducer } from "../utils/tests/customRender";
import Home from "./Home";
import { server } from "../mocks/server";
import { rest } from "msw";
import { abbreviatedPackagesMOCK, categoriesMOCK } from "../mocks/mockData";

function setupTest() {
    renderWithoutReducer(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <Home />
        </IntlProvider>
    );
}

test("Should render nothing when packages and categories are not loaded", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/list/`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: [],
                })
            );
        }),
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(ctx.json({ data: [] }));
        }),
        rest.get(`http://127.0.0.1:10001/computer`, (req, res, ctx) => {
            return res(
                ctx.json({
                    computer_name: "8GGY4Y2_IL",
                })
            );
        })
    );

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
    const emptyWrapper = screen.getByTestId("wrapper");
    expect(emptyWrapper).toBeInTheDocument();
});

test("Should render nothing when categories are not loaded", async () => {
    server.use(
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
        rest.get(`http://127.0.0.1:10001/computer`, (req, res, ctx) => {
            return res(
                ctx.json({
                    computer_name: "8GGY4Y2_IL",
                })
            );
        })
    );

    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(ctx.json({ data: [] }));
        })
    );

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
    const emptyWrapper = screen.getByTestId("wrapper");
    expect(emptyWrapper).toBeInTheDocument();
});

test("Should render nothing when there are no packages", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/list/`, (req, res, ctx) => {
            return res(ctx.json({ data: [] }));
        }),
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: categoriesMOCK,
                })
            );
        }),
        rest.get(`http://127.0.0.1:10001/computer`, (req, res, ctx) => {
            return res(
                ctx.json({
                    computer_name: "8GGY4Y2_IL",
                })
            );
        })
    );

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));

    const emptyWrapper = screen.getByTestId("wrapper");
    expect(emptyWrapper).toBeInTheDocument();
});

test("Should render Appcards under the related categories when packages and categories are loaded", async () => {
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
        }),
        rest.get(`http://127.0.0.1:10001/computer`, (req, res, ctx) => {
            return res(
                ctx.json({
                    computer_name: "8GGY4Y2_IL",
                })
            );
        })
    );

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
    const categoryHeaders = await screen.findAllByRole("heading", { level: 1 });
    expect(categoryHeaders.length).toBe(5);

    const appCards = await screen.findAllByTestId("appCardWrapper");
    expect(appCards.length).toBe(8);
});

test("Should render an error if packages cannot be loaded ", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/list/`, (req, res, ctx) => {
            return res(
                ctx.status(404),
                ctx.json({
                    errorMessage: `Unexpected error`,
                })
            );
        }),
        rest.get(`http://127.0.0.1:10001/computer`, (req, res, ctx) => {
            return res(
                ctx.json({
                    computer_name: "8GGY4Y2_IL",
                })
            );
        })
    );

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));

    const error = screen.getByRole("alert");
    expect(error).toBeInTheDocument();
    expect(error.innerHTML).toMatchInlineSnapshot(`"Er is iets fout gegaan, probeer het later opnieuw"`);
});
