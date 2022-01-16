import React, { HTMLAttributes } from "react";

interface IHeaderProps extends HTMLAttributes<HTMLElement> {
    background: string;
}

export const Header = ({ background, ...props }: IHeaderProps) => {
    return (
        <header style={ { backgroundImage: `url(${background})` } }  { ...props } />
    );
};
