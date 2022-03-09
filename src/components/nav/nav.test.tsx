import { screen, within } from "@testing-library/react";
import React from "react";
import { IntlProvider } from "react-intl";
import { translationSets } from "../../i18n/translations";
import { categoriesMOCK } from "../../mocks/mockData";
import { renderWithoutReducer } from "../../utils/tests/customRender";

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
