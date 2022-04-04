import React from "react";
import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl";
import styled from "styled-components";
import { Header1 } from "../components/html/header/Header";

const MainContent = styled.div`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 2 / 12;
    margin: 3.2rem 0;
    flex-direction: column;
    text-align: center;
`;

const NotAllowed = ({ intl }: WrappedComponentProps) => {
    return (
        <MainContent>
            <Header1>
                <FormattedMessage
                    id="no.rights.header"
                    defaultMessage="U bent helaas niet gemachtigd om de store te gebruiken"
                ></FormattedMessage>
            </Header1>
            <p>
                <FormattedMessage
                    id="no.rights.subheader"
                    defaultMessage="Neem contact op met de servicedesk om de store te activeren"
                ></FormattedMessage>
            </p>
        </MainContent>
    );
};

export default injectIntl(NotAllowed);
