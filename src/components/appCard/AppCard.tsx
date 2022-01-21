import React, { FC, HTMLAttributes } from "react";

interface IAppCardProps extends HTMLAttributes<HTMLElement> {
    title: string;
    category?: string;
    imageUrl?: string;
    price?: string;
    backgroundColor?: string
}



export const AppCard = ({ title, category, imageUrl, price, backgroundColor, ...props }: IAppCardProps) => {
    return (
        <div className="card-container" { ...props }>
            <div className="image-container">

                <div style={ { backgroundImage: `url(${imageUrl})` } }>

                </div>
                { title }
            </div>
        </div>
    );
};
