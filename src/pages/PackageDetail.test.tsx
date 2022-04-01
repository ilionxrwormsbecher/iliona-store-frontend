import { screen, within } from "@testing-library/react";
import { createBrowserHistory } from "history";
import React from "react";
import { IntlProvider } from "react-intl";
import { createReduxHistoryContext } from "redux-first-history";
import { translationSets } from "../i18n/translations";
import { render, renderWithoutReducer, waitForElementToBeRemoved } from "../utils/tests/customRender";
import PackageDetail from "./PackageDetail";
import { server } from "../mocks/server";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import { status } from "msw/lib/types/context";
import { localPackagesMOCK } from "../mocks/mockData";

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
    expect(alert.innerHTML).toBe("Er is iets fout gegaan, probeer het later opnieuw");
});

test.each<[string, number, string]>([
    ["success", 201, "De applicatie is toegevoegd aan de wachtrij om geinstalleerd te worden"],
    [
        "warning",
        422,
        "De applicatie staat momenteel in de wachtrij om geinstalleerd te worden, een ogenblik geduld alstublieft",
    ],
    ["error", 404, "Er is iets fout gegaan, probeer het later opnieuw"],
    ["error", 500, "Er is iets fout gegaan, probeer het later opnieuw"],
])("Should display a %s when the server returns a status of %s", async (resultType, statusCode, message) => {
    server.use(
        rest.get(
            `https://api.iliona.cloud/store-packages/get_by_id/0f941bd9-9d1d-4617-8616-c6592be7a2ac`,
            (req, res, ctx) => {
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
                                ImageUrl:
                                    "https://ilionaprod2001.blob.core.windows.net/app-store-logos/acrobat-172.png",
                                InstallationTime: 10,
                                IsAlreadyInstalled: false,
                                IsVisible: true,
                                LicenseMessage: "Licentie",
                                NeedToRestart: false,
                                PackageName: "ILX-AdobePro",
                                RequiresLicense: false,
                                Summary:
                                    "Alle tools die je nodig hebt om pdf's te converteren, bewerken, ondertekenen.",
                                Tags: "",
                                Weight: 3,
                                PublishDate: "2020-12-11T16:11:29.3221949Z",
                            },
                        ],
                    })
                );
            }
        ),
        rest.post(`https://api.iliona.cloud/store-packages/install-package`, (req, res, ctx) => {
            return res(ctx.status(statusCode), ctx.json({ detail: "entry already exists" }));
        })
    );

    window.history.pushState({}, "testpage", "/details/22f3046f-2caa-4108-90e4-61377450f3fa");
    setupTest();

    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));

    const installButton = screen.getByRole("button", {
        name: /install/i,
    });

    userEvent.click(installButton);

    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));

    const alert = screen.getByRole("alert");
    expect(alert.textContent).toBe(message);
});

test("Should return a succes alert when the install package button has been pressed.", async () => {
    server.use(
        rest.get(
            `https://api.iliona.cloud/store-packages/get_by_id/0f941bd9-9d1d-4617-8616-c6592be7a2ac`,
            (req, res, ctx) => {
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
                                ImageUrl:
                                    "https://ilionaprod2001.blob.core.windows.net/app-store-logos/acrobat-172.png",
                                InstallationTime: 10,
                                IsAlreadyInstalled: false,
                                IsVisible: true,
                                LicenseMessage: "Licentie",
                                NeedToRestart: false,
                                PackageName: "ILX-AdobePro",
                                RequiresLicense: false,
                                Summary:
                                    "Alle tools die je nodig hebt om pdf's te converteren, bewerken, ondertekenen.",
                                Tags: "",
                                Weight: 3,
                                PublishDate: "2020-12-11T16:11:29.3221949Z",
                            },
                        ],
                    })
                );
            }
        ),
        rest.post(`https://api.iliona.cloud/store-packages/install-package`, (req, res, ctx) => {
            return res(ctx.status(201), ctx.json(null));
        })
    );

    window.history.pushState({}, "testpage", "/details/22f3046f-2caa-4108-90e4-61377450f3fa");
    setupTest();

    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));

    const installButton = screen.getByRole("button", {
        name: /install/i,
    });

    userEvent.click(installButton);

    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));

    const alert = screen.getByRole("alert");
    expect(alert.textContent).toBe("De applicatie is toegevoegd aan de wachtrij om geinstalleerd te worden");

    const alertCloseButton = screen.getByRole("button", { name: /close alert/i });
    await userEvent.click(alertCloseButton);
    expect(alert).not.toBeInTheDocument();
});

test("Should display whether a package is installed", async () => {
    server.use(
        rest.get(
            `https://api.iliona.cloud/store-packages/get_by_id/0f941bd9-9d1d-4617-8616-c6592be7a2ac`,
            (req, res, ctx) => {
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
                                ImageUrl:
                                    "https://ilionaprod2001.blob.core.windows.net/app-store-logos/acrobat-172.png",
                                InstallationTime: 10,
                                IsAlreadyInstalled: false,
                                IsVisible: true,
                                LicenseMessage: "Licentie",
                                NeedToRestart: false,
                                PackageName: "ILX-AdobePro",
                                RequiresLicense: false,
                                Summary:
                                    "Alle tools die je nodig hebt om pdf's te converteren, bewerken, ondertekenen.",
                                Tags: "",
                                Weight: 3,
                                PublishDate: "2020-12-11T16:11:29.3221949Z",
                            },
                        ],
                    })
                );
            }
        ),
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
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));

    screen.logTestingPlaygroundURL();

    const isInstalledNode = screen.getByTestId("isInstalled");
    expect(isInstalledNode.textContent).toBe("Ja");
});
