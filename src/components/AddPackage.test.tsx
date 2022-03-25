import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { IntlProvider } from "react-intl";
import { translationSets } from "../i18n/translations";
import { byteArrayPdf, dataBase64 } from "../mocks/fileMocks";
import { categoriesMOCK } from "../mocks/mockData";
import { server } from "../mocks/server";
import {
    act,
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

test("Should be able to correctly upload a testfile", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(ctx.json({ data: categoriesMOCK }));
        })
    );

    const arrayBuffer = Uint8Array.from(window.atob(dataBase64), (c) => c.charCodeAt(0));
    const file = new File([arrayBuffer], "dummy.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 1024 * 24 + 1 });

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("fake-spinner"));

    const imageUploader = screen.getByLabelText(/image/i) as HTMLInputElement;
    userEvent.upload(imageUploader, file);

    await waitFor(() => expect(imageUploader?.files).toHaveLength(1));
    const fileName = await screen.findByText("dummy.png");
    expect(fileName).toBeInTheDocument();
});

test("Should throw an error when the file size is too big.", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(ctx.json({ data: categoriesMOCK }));
        })
    );

    const arrayBuffer = Uint8Array.from(window.atob(dataBase64), (c) => c.charCodeAt(0));
    const file = new File([arrayBuffer], "dummy.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 1024 * 1024 + 1 });

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("fake-spinner"));

    const imageUploader = screen.getByLabelText(/image/i) as HTMLInputElement;
    userEvent.upload(imageUploader, file);

    await waitFor(() => expect(imageUploader?.files).toHaveLength(1));
    const error = await screen.findByTestId("image-error");
    expect(error).not.toBeNull();
    expect(error.textContent).toBe("File size too big");
});

test("Should throw an error when the file extention is not allowed.", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(ctx.json({ data: categoriesMOCK }));
        })
    );

    const arrayBuffer = Uint8Array.from(window.atob(byteArrayPdf), (c) => c.charCodeAt(0));
    const file = new File([arrayBuffer], "dummy.pdf", { type: "image/pdf" });
    Object.defineProperty(file, "size", { value: 1024 * 24 + 1 });

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("fake-spinner"));

    const imageUploader = screen.getByLabelText(/image/i) as HTMLInputElement;
    userEvent.upload(imageUploader, file);

    await waitFor(() => expect(imageUploader?.files).toHaveLength(1));
    const error = await screen.findByTestId("image-error");
    expect(error).not.toBeNull();
    expect(error.textContent).toBe("File type not supported");
});

test("Should throw an error when the file extention is correct but mime type is incorrect.", async () => {
    server.use(
        rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
            return res(ctx.json({ data: categoriesMOCK }));
        })
    );

    const arrayBuffer = Uint8Array.from(window.atob(byteArrayPdf), (c) => c.charCodeAt(0));
    const file = new File([arrayBuffer], "dummy.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 1024 * 24 + 1 });

    setupTest();
    await waitForElementToBeRemoved(() => screen.getByTestId("fake-spinner"));

    const imageUploader = screen.getByLabelText(/image/i) as HTMLInputElement;
    userEvent.upload(imageUploader, file);

    await waitFor(() => expect(imageUploader?.files).toHaveLength(1));
    const error = await screen.findByTestId("image-error");
    expect(error).not.toBeNull();
    expect(error.textContent).toBe("File type not supported");
});
