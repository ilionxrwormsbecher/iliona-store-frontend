import React, { HTMLAttributes } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { injectIntl, WrappedComponentProps } from "react-intl";

interface INavDropdownProps extends HTMLAttributes<HTMLElement> {
    items: string[];
}

const NavDropdown = ({ items, intl }: INavDropdownProps & WrappedComponentProps ) => {

    const categoryText = intl.formatMessage({
        id: "navigation.category.text",
        defaultMessage: "categorieën"
    })
    
    const listItems = items.map((item: string) => {
        return (<Dropdown.Item key={ item } as="button">{ item }</Dropdown.Item>);
    });

    return (
        <DropdownButton title={categoryText}>
            { listItems }
        </DropdownButton>
    );
};

export default injectIntl(NavDropdown);
