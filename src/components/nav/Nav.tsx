import React from "react";
import styled from "styled-components";
import NavItems from "./NavItems";
import { screenSize } from "../../themes/global";
import { IIlionaCategory } from "../../models/Ilionacategory";

const NavigationContainer = styled.nav`
    width: 100%;
    grid-row: 4 / 5;
    grid-column: 1 / 13;
    height: 4rem;
    display: grid;
    grid-template-columns: 1.6rem repeat(10, 1fr) 1.6rem;
    background: white;
    border-bottom: 1px solid ${(p) => p.theme.borderNeutral};
    border-top: 1px solid ${(p) => p.theme.borderNeutral};
    font-size: 1.4rem;

    @media ${screenSize.tablet} {
        grid-template-columns: 6.4rem repeat(10, 1fr) 6.4rem;
    }
`;

const CategoryContainer = styled.div`
    display: flex;
    grid-column: 2/12;
    height: 100%;
    align-items: center;
    position: relative;
    cursor: pointer;

    .btn-primary,
    .btn-primary:focus,
    .btn-primary:hover {
        background-color: white;
        border-color: white;
        color: ${(p) => p.theme.primaryNavigationTextColor};
        font-size: 1.4rem;
        box-shadow: none;
        padding: 0;

        &::after {
            margin-left: 1.6rem;
        }

        & + div {
            font-size: 1.4rem;
        }
    }
`;

interface NavProps {
    categories: IIlionaCategory[];
}

const Nav = ({ categories }: NavProps) => {
    return (
        <NavigationContainer>
            <CategoryContainer>
                <NavItems categories={categories} />
            </CategoryContainer>
        </NavigationContainer>
    );
};

export default Nav;
