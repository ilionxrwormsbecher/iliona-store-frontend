import React from "react";
import { IntlProvider } from "react-intl";
import { translationSets } from "../i18n/translations";
import { renderWithoutReducer } from "../utils/tests/customRender";
import NotAllowed from "./NotAllowed";
import { screen, waitForElementToBeRemoved, within } from "@testing-library/react";

function setupTest() {
    renderWithoutReducer(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <NotAllowed />
        </IntlProvider>
    );
}

describe("Not Allowed tests", () => {
    it("Should render a header and subheader telling the use he/she is not allowed to visit the page.", () => {
        setupTest();

        const header = screen.getByRole("heading", {
            level: 1,
        });
        const subHeader = screen.getByText(/neem contact op met de servicedesk om de store te activeren/i);

        expect(header.textContent).toMatchInlineSnapshot(`"U bent helaas niet gemachtigd om de store te gebruiken"`);
        expect(subHeader).toBeInTheDocument();
    });
});
