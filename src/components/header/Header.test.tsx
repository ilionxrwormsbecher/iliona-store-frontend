import { render, screen } from "@testing-library/react";
import React from "react";
import { HeaderComponent as Header } from "./Header";

test("renders the header as a background image", async () => {
    const backgroundImagePath = "/assets/img/logo_ggd.jpg";
    
    render(<Header background={ backgroundImagePath  } />);
    const ilionxLogo = screen.getByTestId("header");
    expect(ilionxLogo).toHaveStyle(`background-image: url(${backgroundImagePath}) `);
});


