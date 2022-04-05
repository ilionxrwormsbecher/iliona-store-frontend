import { render, screen } from "@testing-library/react";
import React from "react";
import { HeaderBar } from "./HeaderBar";
import App from "../../App";
import { IntlProvider } from "react-intl";
import { translationSets } from "../../i18n/translations";
import { debug } from "console";

test("renders the ilionx logo", async () => {
    render(<HeaderBar />);
    const ilionxLogo = screen.getByAltText(/ilionx logo/);
    expect(ilionxLogo).toHaveAttribute("src", "/assets/img/logo.png");
});

test("renders the avatar and username", async () => {
    render(
        <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
            <HeaderBar />
        </IntlProvider>
    );

    const loggedInUseravatar = screen.findByTestId("login-avatar");
    expect(loggedInUseravatar).not.toEqual({});
});
