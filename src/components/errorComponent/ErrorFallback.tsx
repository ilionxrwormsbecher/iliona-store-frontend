import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl";
import styled from "styled-components";
import { Header1 } from "../html/header/Header";

const MainContent = styled.div`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 2 / 12;
    margin: 3.2rem 0;
    flex-direction: column;
    text-align: center;
`;

const ErrorFallback = (error: any): JSX.Element => {
    return (
        <MainContent>
            <div role="alert">
                <Header1>
                    Er is een onverwachte fout opgetreden, probeer het nogmaals of neem contact op met uw beheerder
                </Header1>
            </div>
        </MainContent>
    );
};

export default ErrorFallback;
