import React, { FC } from "react";
import styled from "styled-components";


const H1 =  styled.h1`
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 39px;
    margin-bottom: 1.6rem;
`;

const H2 =  styled.h2`
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 1.6rem;
`;

export const Header1: FC<{}> = ({ children, ...props }) => {
    return (
        <H1 { ...props }>{ children }</H1>
    );
};

export const Header2: FC<{}> = ({ children, ...props }) => {
    return (
        <H2 { ...props }>{ children }</H2>
    );
};


