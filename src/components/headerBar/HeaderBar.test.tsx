import { render, screen } from "@testing-library/react";
import React from "react";
import { HeaderBar } from "./HeaderBar";
import App from "../../App";


test("renders the ilionx logo", async () => {
    
    render(<HeaderBar />);
    const ilionxLogo = screen.getByAltText(/ilionx logo/);
    expect(ilionxLogo).toHaveAttribute("src", "/assets/img/logo.png");
});


test("renders the avatar and username", async () => {
    render(<App />);
    render(<HeaderBar />);
    const loggedInUseravatar = screen.getByRole("region");
    expect(loggedInUseravatar).toHaveClass("login-avatar");
});
