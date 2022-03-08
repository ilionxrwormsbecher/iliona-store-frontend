import React from "react";
import { IntlProvider, IntlShape } from "react-intl";
import { CategoriesReducer } from "../../store/slices/categories/categoryReducer";
import { reduxCategoriesFilled } from "../../utils/tests/mockRedux";
import {
    render,
    renderWithoutReducer,
    screen,
    waitFor,
    waitForElementToBeRemoved,
    within,
} from "../../utils/tests/customRender";
import NavItems from "./NavItems";
import { translationSets } from "../../i18n/translations";
import userEvent from "@testing-library/user-event";
import { server } from "../../mock/server";
import { rest } from "msw";
import { categoriesMOCK } from "../../mock/mockData";

function setupTest() {
    renderWithoutReducer(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <NavItems categories={categoriesMOCK} />
        </IntlProvider>
    );
}

test("Should render all links", async () => {
    setupTest();
    const list = screen.getByRole("list");

    const linksArray = within(list).getAllByRole("link");
    const linksTextarray = linksArray.map((link) => {
        return link.textContent;
    });
    expect(linksTextarray[1]).toBe("Multimedia");
    expect(linksTextarray).toMatchInlineSnapshot(`
Array [
  "Alle Applicaties",
  "Multimedia",
  "Overig",
  "Productiviteitstools",
  "Bedrijfssoftware",
  "Internet",
]
`);
});

test("Links should have their href attribute filled", async () => {
    setupTest();
    const links = screen.getAllByTestId("dynamicLink");
    const homeLink = screen.getByTestId("homeLink");

    expect(homeLink).toHaveAttribute("href", "/");

    links.map((link: any) => {
        expect(link).toHaveAttribute("href");
    });
});

test("Should test active classname on an current link", async () => {
    setupTest();
    const list = screen.getByRole("list");

    const homeLink = within(list).getByRole("link", {
        name: /Alle Applicaties/i,
    });

    const multimediaLink = within(list).getByRole("link", {
        name: /Multimedia/i,
    });

    expect(homeLink).toHaveClass("active");

    userEvent.click(multimediaLink);

    await waitFor(() => expect(homeLink).not.toHaveClass("active"));
    expect(multimediaLink).toHaveClass("active");
});
