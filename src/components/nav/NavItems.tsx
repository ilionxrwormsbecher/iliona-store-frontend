import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { screenSize } from "../../themes/global";
import  NavDropdown from "../navDropdown/NavDropdown";
import { FormattedMessage } from "react-intl"

const NavItemsContainer = styled.nav`
    display: flex;
    flex-direction: row;
    height: 100%;
    border-left: 1px solid ${p => p.theme.borderContentSeperator};
    margin-left: 2.4rem;

    ul {
        width: 100%;
        height: 100%;
        margin-left: 0;

        @media ${screenSize.tablet} {
            margin-left: 3.2rem;
        }

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
            }

            .active {
                color: $primary-color;
                background-color: #f7f7f7;
            }       
        }   
    }
`;


const NavItems = () => {

    const items = [
        "Apps", 
        "Security", 
        "tools"
    ];

    return (
        <>
            <NavDropdown items={ items }  />

            <NavItemsContainer>
                <ul>
                    <li>
                        <NavLink to="/" className={ ({ isActive }) => (isActive ? "active" : "") }>
                            <FormattedMessage id="navigation.home.text" defaultMessage="Patches"></FormattedMessage>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/patches" 
                            className={ ({ isActive }) => (isActive ? "active" : "") }>
                            <FormattedMessage id="navigation.patches.text" defaultMessage="Patches"></FormattedMessage>
                        </NavLink>
                    </li>
                </ul>
            </NavItemsContainer>
        </>
    );
};

export default NavItems;
