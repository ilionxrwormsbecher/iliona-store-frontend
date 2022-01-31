import React, { HTMLAttributes } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

interface INavDropdownProps extends HTMLAttributes<HTMLElement> {
    items: string[];
}


export const NavDropdown = ({ items }: INavDropdownProps ) => {
    
    const listItems = items.map((item: string) => {
        return (<Dropdown.Item key={ item } as="button">{ item }</Dropdown.Item>);
    });

    return (
        <DropdownButton title="Category">
            { listItems }
        </DropdownButton>
    );
};
