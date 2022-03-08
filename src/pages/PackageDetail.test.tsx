import { screen, within } from "@testing-library/react";
import { createBrowserHistory } from "history";
import React from "react";
import { IntlProvider } from "react-intl";
import { createReduxHistoryContext } from "redux-first-history";
import { translationSets } from "../i18n/translations";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import { CategoriesReducer } from "../store/slices/categories/categoryReducer";
import { PackagesReducer } from "../store/slices/packages/packagesReducer";
import { render, renderWithoutReducer, waitForElementToBeRemoved } from "../utils/tests/customRender";
import {
    reduxFullStoreButNoSelectedPackage,
    reduxFullStoreWithoutPackages,
    reduxFullStoreWithPackagesAndCategories,
} from "../utils/tests/mockRedux";
import { combineReducers } from "redux";

import PackageDetail from "./PackageDetail";
import CategoryPackages from "./CategoryPackages";
import store from "../store/store";
import { server } from "../mock/server";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

const { routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

function setupTest() {
    renderWithoutReducer(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <PackageDetail />
        </IntlProvider>
    );
}

const rowkey = "0f941bd9-9d1d-4617-8616-c6592be7a2ac";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
    useParams: () => ({ rowkey }),
}));

test("Should render a spinner when the packageDetails are loading and render the page properly when data is provided", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/get_by_id/${rowkey}`, (req, res, ctx) => {
            return res(
                ctx.json({
                    data: [
                        {
                            PartitionKey: "app",
                            RowKey: "a2898a96-4247-4708-87f4-f3bf44cf351b",
                            Category: "b78e9928-0b61-4c12-8c40-036668ef8241",
                            Dependencies: "",
                            Description:
                                "Alle tools die je nodig hebt om pdf's te converteren, bewerken, ondertekenen.",
                            DisplayName: "Adobe Acrobat Pro",
                            ImageUrl: "https://ilionaprod2001.blob.core.windows.net/app-store-logos/acrobat-172.png",
                            InstallationTime: 10,
                            IsAlreadyInstalled: false,
                            IsVisible: true,
                            LicenseMessage: "Licentie",
                            NeedToRestart: false,
                            PackageName: "ILX-AdobePro",
                            RequiresLicense: false,
                            Summary: "Alle tools die je nodig hebt om pdf's te converteren, bewerken, ondertekenen.",
                            Tags: "",
                            Weight: 3,
                            PublishDate: "2020-12-11T16:11:29.3221949Z",
                        },
                    ],
                })
            );
        })
    );

    window.history.pushState({}, "testpage", "/details/22f3046f-2caa-4108-90e4-61377450f3fa");
    setupTest();

    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
    // expect(await screen.findByRole("button", {name: /connect/i})).toBeInTheDocument()

    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header.innerHTML).toBe("Adobe Acrobat Pro");

    const installButton = screen.getByRole("button", { name: /installeren/i });
    expect(installButton).toBeInTheDocument();
    // need to mock out install

    const description = screen.getByText(
        /alle tools die je nodig hebt om pdf's te converteren, bewerken, ondertekenen\./i
    );
    expect(description).toBeInTheDocument();

    const categoryWrapper = screen.getByText(/categorie:/i);
    expect(categoryWrapper.innerHTML).toContain("Bedrijfssoftware");
});

test("Should display an alert when the server returns an error", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/get_by_id/${rowkey}`, (req, res, ctx) => {
            return res(
                ctx.status(403),
                // And a response body, if necessary
                ctx.json({
                    errorMessage: `Unexpected error`,
                })
            );
        })
    );

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));

    const alert = screen.getByRole("alert");
    expect(alert.innerHTML).toBe("Er is iets fout gegaan, probeer het later opnieuw.");
});
