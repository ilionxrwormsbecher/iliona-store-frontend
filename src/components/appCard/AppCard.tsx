import React, { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface IAppCardProps extends HTMLAttributes<HTMLElement> {
    title: string;
    category?: string;
    imageUrl?: string;
    price?: string;
    backgroundColor?: string;
    summary?: string;
    requiresLicense?: boolean;
    rowkey: string;
}

const CardContainer = styled.div`
    width: 204px;
    height: 330px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-right: 3.2rem;
    margin-bottom: 3.2rem;
`;

const ImageContainer = styled.div`
    width: 100%;

`;

const PackageContentContainer = styled.div`
    width: 100%;
    padding: 8px;
    display: flex;
    flex-direction: column;
`;

const PackageHeader = styled.div`
    font-size: 1.6rem;
    color: ${ p => p.theme.primaryTextColor};
`;

const PackageCategory = styled.div`
    font-size: 1.4rem;
`;
const PackageLicense = styled.div`
    font-size: 1.4rem;
    margin-top: 16px;
    text-align: right;

    .negative {
        color: #842029;
    }

    .positive {
        color: #0f5132;
    }
`;



export const AppCard = ({ title, category, imageUrl, backgroundColor, summary, requiresLicense, rowkey, ...props }: IAppCardProps) => {
    const licenseIndication = requiresLicense ? <span className="negative">licensie vereist</span> : <span className="positive">Gratis</span>

    return (
        <NavLink to={`/detail/${rowkey}`}>
            <CardContainer { ...props }>
                <ImageContainer style={ { backgroundImage: `url(${imageUrl})`, width: '100%', height: '230px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', padding: '8px'}}>
                </ImageContainer>


                <PackageContentContainer>
                    <PackageHeader>{ title }</PackageHeader>
                    <PackageCategory>{ category }</PackageCategory>
                    <PackageLicense>{licenseIndication}</PackageLicense>
                </PackageContentContainer>

            </CardContainer>
        </NavLink>
    );
};
