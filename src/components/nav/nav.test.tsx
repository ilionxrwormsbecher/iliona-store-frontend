import { screen, within } from "@testing-library/react";
import { rest } from "msw";
import React from "react";
import { IntlProvider } from "react-intl";
import { translationSets } from "../../i18n/translations";
import { categoriesMOCK } from "../../mock/mockData";
import { server } from "../../mock/server";
import { CategoriesReducer } from "../../store/slices/categories/categoryReducer";
import { render, renderWithoutReducer } from "../../utils/tests/customRender";
import { reduxCategoriesFilled } from "../../utils/tests/mockRedux";
import Nav from "./Nav";

function setupTest() {
    renderWithoutReducer(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <Nav categories={categoriesMOCK} />
        </IntlProvider>
    );
}

test("renders the the navLinks component", async () => {
    setupTest();
    const navContainer = screen.getByRole("navigation");
    const linksArray = within(navContainer).getAllByRole("link");
    expect(linksArray.length).toBeGreaterThan(0);
});
