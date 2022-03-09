import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { IntlProvider } from "react-intl";
import { translationSets } from "../i18n/translations";
import { categoriesMOCK } from "../mocks/mockData";
import { server } from "../mocks/server";
import {
    fireEvent,
    renderWithoutReducer,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "../utils/tests/customRender";
import AddPackage from "./AddPackage";

function setupTest() {
    renderWithoutReducer(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <AddPackage />
        </IntlProvider>
    );
}

test("Should render spinner if categories are not loaded.", async () => {
    server.use(
        //   https://api.iliona.cloud/store-packages/categories
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            console.log("I am intercepting");
            return res(ctx.json({ data: [] }));
        })
    );

    setupTest();

    expect(screen.getByTestId("fake-spinner")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByTestId("fake-spinner"));
});

test("Should test form validation messages corectly", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            console.log("I am intercepting");
            return res(ctx.json({ data: categoriesMOCK }));
        })
    );

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("fake-spinner"));

    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    const displayNameError = await screen.findByRole("alert", { name: /display name/i });
    expect(displayNameError.textContent).toMatchInlineSnapshot(`"The display name is required"`);

    const installationTimeError = screen.getByRole("alert", { name: /installation/i });
    expect(installationTimeError.textContent).toMatchInlineSnapshot(
        `"Installation is required and should be a number"`
    );

    const weightError = screen.getByRole("alert", { name: /weight/i });
    expect(weightError.textContent).toMatchInlineSnapshot(`"The weight is required"`);

    const summaryError = screen.getByRole("alert", { name: /summary/i });
    expect(summaryError.textContent).toMatchInlineSnapshot(`"The summary is required"`);

    const descriptionError = screen.getByRole("alert", { name: /description/i });
    expect(descriptionError.textContent).toMatchInlineSnapshot(`"description must be a string"`);

    const packagesNameError = screen.getByRole("alert", { name: /package name/i });
    expect(packagesNameError.textContent).toMatchInlineSnapshot(`"Package name is required"`);

    const licenseMessageError = screen.getByRole("alert", { name: /license/i });
    expect(licenseMessageError.textContent).toMatchInlineSnapshot(`"The license is required"`);

    const visibilityError = screen.getByRole("alert", { name: /visibility/i });
    expect(visibilityError.textContent).toMatchInlineSnapshot(`"Visible is required"`);

    // const packageName = screen.getByLabelText(/display name/i);
    // expect(packageName).toHaveFocus();
    // userEvent.tab();

    // const category = screen.getByLabelText(/category/i);
    // expect(category).toHaveFocus();
});

test("Should let errormessage disappear when typing in textbox", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(ctx.json({ data: categoriesMOCK }));
        })
    );

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("fake-spinner"));
    screen.logTestingPlaygroundURL();

    const packageName = screen.getByLabelText(/display name/i);
    expect(packageName).toHaveFocus();
    userEvent.tab();

    const category = screen.getByLabelText(/category/i);
    expect(category).toHaveFocus();

    const displayNameError = await screen.findByRole("alert", { name: /display name/i });
    expect(displayNameError).toBeInTheDocument();

    userEvent.type(packageName, "this is a test");
    expect(packageName).toHaveValue("this is a test");

    userEvent.tab();
    expect(await screen.findByRole("alert", { name: /display name/i })).not.toBeInTheDocument();
});
