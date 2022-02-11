import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { screenSize } from "../../themes/global";
import  NavDropdown from "../navDropdown/NavDropdown";
import { FormattedMessage } from "react-intl"
import { IReduxApplicationState } from "../../models/redux/IReduxApplicationState";
import { useSelector } from "react-redux";
import { IIlionaCategory } from "../../models/Ilionacategory";

const NavItemsContainer = styled.nav`
    display: flex;
    flex-direction: row;
    height: 100%;


    ul {
        width: 100%;
        height: 100%;
        margin-left: 0;

        li { 
            display: inline-flex;
            list-style-type: none;
            height: 100%;
            align-items: center;
            font-size: 1.4rem;

            & a {
                color: ${ p => p.theme.primaryNavigationTextColor};
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
                background-color: #f7f7f7;
            }       
        }   
    }
`;


const NavItems = () => {

    const categories = useSelector((state: IReduxApplicationState) => state.categorySlice);

    const categoryLinks = categories?.categories.map((category: IIlionaCategory) => {
        return (
            <li key={category.Name}>
                <NavLink to={`/${category.Name.toLowerCase()}`} className={ ({ isActive }) => (isActive ? "active" : "") }>
                    {/* <FormattedMessage id="navigation.home.text" defaultMessage="Patches"></FormattedMessage> */}
                    {category.Name}
                </NavLink>
            </li>
        )
    });

    return (
        <>
            <NavItemsContainer>
                <ul>
                    <li key="home"> 
                        <NavLink to="/" className={ ({ isActive }) => (isActive ? "active" : "") }>
                            <FormattedMessage id="navigation.home.text" defaultMessage="Home"></FormattedMessage>
                        </NavLink>
                    </li>
                    {categoryLinks}
                </ul>
            </NavItemsContainer>
        </>
    );
};

export default NavItems;
