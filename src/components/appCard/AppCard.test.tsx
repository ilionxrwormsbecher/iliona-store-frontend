import React from "react";
import AppCard from "./AppCard";
import { IntlShape } from "react-intl";
import { CategoriesReducer } from "../../store/slices/categories/categoryReducer";
import { reduxCategoriesFilled } from "../../utils/tests/mockRedux";
import { render } from "../../utils/tests/customRender";
import {
	intlDutch,
	intlEnglish,
	intlChinese,
} from "../../utils/tests/mockTranslations";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

function setupTest(
	intlLanguage: IntlShape,
	reducer: any,
	requiredLicense: boolean = false
) {
	const { store } = render(
		<AppCard
			title="Docker Desktop"
			category="aa1ca463-a779-45fe-b1b7-9410521a9a84"
			imageUrl="https://ilionaprod2001.blob.core.windows.net/app-store-logos/dockerLogoResized.png"
			backgroundColor="red"
			summary="Let\'s you run containerized apps"
			requiresLicense={requiredLicense}
			rowkey="22afc55f-b02c-434b-8441-da96023094b7"
			intl={intlLanguage}
		/>,
		reducer,
		reduxCategoriesFilled
	);

	return { store };
}

test("should render the link to the product page succesfully", async () => {
	setupTest(intlDutch, CategoriesReducer);
	const linkToDetailPage = screen.getByRole("link");

	userEvent.click(linkToDetailPage);

	expect(linkToDetailPage).toHaveAttribute(
		"href",
		"/details/22afc55f-b02c-434b-8441-da96023094b7"
	);
	expect(window.location.pathname).toMatchInlineSnapshot(
		`"/details/22afc55f-b02c-434b-8441-da96023094b7"`
	);
});

test("should render the category in Dutch", async () => {
	setupTest(intlDutch, CategoriesReducer);
	const categoryNode = screen.getByText(/productiviteitstools/i);

	expect(categoryNode.innerHTML).toContain("Productiviteitstools");
});

test("should render the category in English", async () => {
	setupTest(intlEnglish, CategoriesReducer);
	const categoryNode = screen.getByText(/productivity tools/i);

	expect(categoryNode.innerHTML).toContain("Productivity tools");
});

test("should render the category in Dutch, when language is set to missing language", async () => {
	setupTest(intlChinese, CategoriesReducer);
	const categoryNode = screen.getByText(/productiviteitstools/i);

	expect(categoryNode.innerHTML).toContain("Productiviteitstools");
});

test("should render the name of the product correctly and show a product image", () => {
	setupTest(intlDutch, CategoriesReducer);
	const imageNode = screen.getByTestId("packageImage");
	const packageTitleNode = screen.getByTestId("packageName");

	expect(imageNode.style).toContain("background-image");
	expect(packageTitleNode.innerHTML).toBe("Docker Desktop");
});

test("should render Gratis whether the app is free", () => {
	setupTest(intlDutch, CategoriesReducer);
	const licenseText = screen.getByText(/Gratis/i);
	expect(licenseText).toBeInTheDocument();
});

test("should render whether the app is free or paid", () => {
	setupTest(intlDutch, CategoriesReducer, true);
	const licenseText = screen.getByText(/Licensie vereist/i);
	expect(licenseText).toBeInTheDocument();
});
