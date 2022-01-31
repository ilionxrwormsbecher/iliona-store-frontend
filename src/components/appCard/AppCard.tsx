import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface IAppCardProps extends HTMLAttributes<HTMLElement> {
    title: string;
    category?: string;
    imageUrl?: string;
    price?: string;
    backgroundColor?: string;
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



export const AppCard = ({ title, category, imageUrl, price, backgroundColor, ...props }: IAppCardProps) => {
    return (
        <CardContainer { ...props }>
            <ImageContainer>
                <div style={ { backgroundImage: `url(${imageUrl})` } }>

                </div>
                { title } 
            </ImageContainer>
        </CardContainer>
    );
};
