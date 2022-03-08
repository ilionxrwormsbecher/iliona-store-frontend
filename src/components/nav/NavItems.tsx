import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { screenSize } from "../../themes/global";
import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl";
import { IIlionaCategory } from "../../models/Ilionacategory";
import { translateRoutePaths } from "../../i18n/CategoryTranslations";

const NavItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;

    ul {
        width: 100%;
        height: 100%;
        margin-left: 0;

        .hide-small-screen {
            display: none;

            @media ${screenSize.normalSizeTable} {
                display: inline-block;
            }
        }

        li {
            display: inline-flex;
            list-style-type: none;
            height: 100%;
            align-items: center;
            font-size: 1.4rem;

            & a {
                color: ${(p) => p.theme.primaryNavigationTextColor};
                padding: 0 8px;
                height: 100%;
                display: inline-flex;
                align-items: center;
                justify-content: center;

                @media ${screenSize.tablet} {
                    padding: 0 16px;
                }
            }

            .active {
                color: $primary-color;
                background-color: red;
            }
        }
    }
`;

interface NavProps {
    categories: IIlionaCategory[];
}

const NavItems = ({ intl, categories }: NavProps & WrappedComponentProps) => {
    let categoryLinks;

    if (categories && categories.length > 0) {
        categoryLinks = categories.map((category: IIlionaCategory) => {
            return (
                <li className="hide-small-screen" key={category.Name}>
                    <NavLink
                        to={`/categorie/${category.RouteFriendlyName.toLowerCase()}`}
                        data-testid="dynamicLink"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        {translateRoutePaths(category.Name, intl)}
                    </NavLink>
                </li>
            );
        });
    }

    return (
        <>
            <NavItemsContainer>
                <ul data-testid="links">
                    <li key="home">
                        <NavLink to="/" data-testid="homeLink" className={({ isActive }) => (isActive ? "active" : "")}>
                            <FormattedMessage
                                id="navigation.home.text"
                                defaultMessage="Alle applicaties"
                            ></FormattedMessage>
                        </NavLink>
                    </li>
                    {categoryLinks}
                </ul>
            </NavItemsContainer>
        </>
    );
};

export default injectIntl(NavItems);
