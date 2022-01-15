import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders the ilionx logo", async () => {
    
    render(<App />);
    const ilionxLogo = screen.getByAltText(/ilionx logi/);
    expect(ilionxLogo).toHaveAttribute("src", "/assets/img/logo.png");
});
