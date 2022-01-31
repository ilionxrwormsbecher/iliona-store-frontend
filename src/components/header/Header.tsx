import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface IHeaderProps extends HTMLAttributes<HTMLElement> {
    background: string;
}

const Header = styled.header<IHeaderProps>`
    height: 212px;
    grid-column: 1 / 13;
    background-position: center;
    background-size: cover cover;
    background-repeat: no-repeat;
    background-color: ${p => p.theme.headerBackgroundColor};
    ${props => props.background && `background-image: url(${props.background})` }
`;

export const HeaderComponent = ( { background, ...props } : IHeaderProps) => {
    return (
        <Header data-testid="header" background={ background } { ...props } />
    );
};
