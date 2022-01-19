import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { HTMLAttributes, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

interface INavDropdownProps extends HTMLAttributes<HTMLElement> {
    items: string[];
}


export const NavDropdown = ({ items, ...props }: INavDropdownProps ) => {
    
    const listItems = items.map((item: string) => {
        return (<Dropdown.Item key={ item } as="button">{ item }</Dropdown.Item>);
    });

    return (
        <DropdownButton id="dropdown-item-button" title="Category">
            { listItems }
        </DropdownButton>
    );
};
