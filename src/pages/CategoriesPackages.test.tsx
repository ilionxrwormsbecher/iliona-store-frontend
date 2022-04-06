import React from "react";
import { IntlProvider } from "react-intl";
import { translationSets } from "../i18n/translations";
import { renderWithoutReducer, screen, waitFor, waitForElementToBeRemoved } from "../utils/tests/customRender";
import CategoryPackages from "./CategoryPackages";
import { server } from "../mocks/server";
import { rest } from "msw";
import { abbreviatedPackagesMOCK, categoriesMOCK, localPackagesMOCK } from "../mocks/mockData";

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
        }),
        rest.get(`https://api.iliona.cloud/store-packages/list/`, (req, res, ctx) => {
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

    waitFor(() => {
        const noPackagesNode = screen.getByTestId("noPackagesAvailable");
        expect(noPackagesNode).toBeInTheDocument();
    });
});

test("should render a spinner when the packages are being retrieved.", async () => {
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
        rest.get(`http://localhost:10001/localpackages`, (req, res, ctx) => {
            return res(ctx.json(localPackagesMOCK));
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
    // await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));

    waitFor(() => {
        const headingNode = screen.getByRole("heading", { level: 1 });
        expect(headingNode.innerHTML).toEqual("Multimedia");
    });
});
