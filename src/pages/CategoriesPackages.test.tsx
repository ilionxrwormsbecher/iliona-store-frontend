import { createBrowserHistory, createMemoryHistory } from "history";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { createReduxHistoryContext } from "redux-first-history";
import { translationSets } from "../i18n/translations";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import { CategoriesReducer } from "../store/slices/categories/categoryReducer";
import { PackagesReducer } from "../store/slices/packages/packagesReducer";
import { render } from "../utils/tests/customRender";
import {
	reduxFullStoreWithoutPackages,
	reduxFullStoreWithPackagesAndCategories,
	reduxNoPackagesAndCategories,
	reduxPackagesErrormessage,
	reduxPackagesLoading,
} from "../utils/tests/mockRedux";
import CategoryPackages from "./CategoryPackages";
import { combineReducers } from "redux";

const { routerReducer } = createReduxHistoryContext({
	history: createBrowserHistory(),
});

const rootReducer = () =>
	combineReducers<IReduxApplicationState>({
		packagesSlice: PackagesReducer,
		categorySlice: CategoriesReducer,
		router: routerReducer,
	});

function setupTest(reducer: any, reduxStoreObject: any) {
	const { getByRole, getByTestId, getByText, debug, getAllByTestId, store } =
		render(
			<IntlProvider locale={"nl"} messages={translationSets["nl"]}>
				<CategoryPackages />
			</IntlProvider>,
			reducer,
			reduxStoreObject
		);

	return { getByRole, getByTestId, getByText, debug, getAllByTestId, store };
}

test("should render an message when there are no packages available.", async () => {
	const component = setupTest(rootReducer(), reduxFullStoreWithoutPackages);

	const noPackagesNode = component.getByTestId("noPackagesAvailble");
	expect(noPackagesNode.innerHTML).toBe(
		"Er is iets fout gegaan, probeer het later opnieuw."
	);
});

test("should render a spinner when the packages are being retrieved.", async () => {
	const component = setupTest(rootReducer(), reduxPackagesLoading);
	const spinnerNode = component.getByTestId("spinner");

	expect(spinnerNode).not.toBeNull();
});

test("should render an error message when something has gone wrong.", async () => {
	const component = setupTest(rootReducer(), reduxPackagesErrormessage);
	const errorNode = component.getByRole("alert");

	expect(errorNode.innerHTML).toBe(
		"Er is iets fout gegaan, probeer het later opnieuw."
	);
});

test("should render an error when the categories are unavailable.", async () => {
	const component = setupTest(rootReducer(), reduxNoPackagesAndCategories);
	const noPackagesNode = component.getByTestId("noPackagesAvailble");
	expect(noPackagesNode.innerHTML).toBe(
		"Er is iets fout gegaan, probeer het later opnieuw."
	);
});

test("should render the category title correctly", async () => {
	const component = setupTest(
		rootReducer(),
		reduxFullStoreWithPackagesAndCategories
	);
	const headingNode = component.getByRole("heading", { level: 1 });
	expect(headingNode.innerHTML).toEqual("Productiviteitstools");
});

test("should render the number of packages correctly", async () => {
	const component = setupTest(
		rootReducer(),
		reduxFullStoreWithPackagesAndCategories
	);

	const packageLinks = component.getAllByTestId("appCardWrapper");
	component.debug(packageLinks);
	expect(packageLinks).toHaveLength(2);
});
