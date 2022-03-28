import React from "react";
import AppCard from "./AppCard";
import { IntlProvider, IntlShape } from "react-intl";
import { renderWithoutReducer } from "../../utils/tests/customRender";
import { intlDutch, intlEnglish, intlChinese } from "../../utils/tests/mockTranslations";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { translationSets } from "../../i18n/translations";
import { categoriesMOCK } from "../../mocks/mockData";

function setupTest(language: IntlShape, requiredLicense: boolean = false) {
    renderWithoutReducer(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <AppCard
                packageName="ILX-Docker"
                title="Docker Desktop"
                category="aa1ca463-a779-45fe-b1b7-9410521a9a84"
                imageUrl="https://ilionaprod2001.blob.core.windows.net/app-store-logos/dockerLogoResized.png"
                backgroundColor="red"
                summary="Let\'s you run containerized apps"
                requiresLicense={requiredLicense}
                rowkey="22afc55f-b02c-434b-8441-da96023094b7"
                intl={language}
                categories={categoriesMOCK}
                localPackages={[]}
            />
        </IntlProvider>
    );
}

describe("App card tests", () => {
    test("should render the link to the product page succesfully", async () => {
        setupTest(intlDutch);

        const linkToDetailPage = screen.getByRole("link");

        userEvent.click(linkToDetailPage);

        expect(linkToDetailPage).toHaveAttribute("href", "/details/22afc55f-b02c-434b-8441-da96023094b7");
        expect(window.location.pathname).toMatchInlineSnapshot(`"/details/22afc55f-b02c-434b-8441-da96023094b7"`);
    });

    test("should render the category in Dutch", async () => {
        setupTest(intlDutch);

        const categoryNode = screen.getByText(/productiviteitstools/i);
        expect(categoryNode.innerHTML).toContain("Productiviteitstools");
    });

    test("should render the category in English", async () => {
        setupTest(intlEnglish);

        const categoryNode = screen.getByText(/productivity tools/i);
        expect(categoryNode.innerHTML).toContain("Productivity tools");
    });

    test("should render the category in Dutch, when language is set to missing language", async () => {
        const errorMock = jest.spyOn(console, "error").mockImplementation(() => {});
        setupTest(intlChinese);

        const categoryNode = screen.getByText(/productiviteitstools/i);
        expect(categoryNode.innerHTML).toContain("Productiviteitstools");
        expect(console.error).toHaveBeenCalledTimes(1);
        errorMock.mockRestore();
    });

    test("should render the name of the product correctly and show a product image", async () => {
        setupTest(intlDutch);

        const imageNode = screen.getByTestId("packageImage");
        const packageTitleNode = screen.getByTestId("packageName");

        expect(imageNode.style).toContain("background-image");
        expect(packageTitleNode.innerHTML).toBe("Docker Desktop");
    });

    test("should render Gratis whether the app is free", async () => {
        setupTest(intlDutch);

        const licenseText = screen.getByText(/Gratis/i);
        expect(licenseText).toBeInTheDocument();
    });

    test("should render whether the app is free or paid", async () => {
        setupTest(intlDutch, true);

        const licenseText = screen.getByText(/Licensie vereist/i);
        expect(licenseText).toBeInTheDocument();
    });
});
