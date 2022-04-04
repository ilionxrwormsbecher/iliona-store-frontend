import React from "react";
import { IntlProvider } from "react-intl";
import { screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import { renderWithoutReducer } from "../../utils/tests/customRender";
import { translationSets } from "../../i18n/translations";
import ErrorFallback from "./ErrorFallback";

function setupTest() {
    renderWithoutReducer(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <ErrorFallback />
        </IntlProvider>
    );
}

describe("Error Fallback tests", () => {
    it("Should notify use an unexpected error has happened", () => {
        setupTest();

        const header = screen.getByRole("heading", {
            level: 1,
        });

        expect(header).toBeInTheDocument();
        expect(header.textContent).toMatchInlineSnapshot(
            `"Er is een onverwachte fout opgetreden, probeer het nogmaals of neem contact op met uw beheerder"`
        );
    });
});
