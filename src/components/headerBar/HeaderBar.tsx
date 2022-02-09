import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import styled from "styled-components";
import { screenSize } from "../../themes/global";

const TopbarSection = styled.div`
    width: 100%;
    height: 6.4rem;
    justify-content: space-between;
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: 6.4rem repeat(10, 1fr) 6.4rem;
    border-bottom: 1px solid ${p => p.theme.borderNeutral};
    background: white;
`;

const Brand =  styled.div`
    display: flex;
    align-items: center;
    grid-column: 1 / 3;
    margin-left: 1.6rem;

    @media ${screenSize.tablet} {
        grid-column: 2 / 3;
        margin-left: 0;
    }
`;

const LoggedInContainer = styled.div`
    display: flex;
    align-self: center;
    justify-self: end;
    grid-column: 9 / 13;
    margin-right: 1.6rem;

    @media ${screenSize.tablet} {
        grid-column: 9 / 12;
        margin-right: 0;
    }

    .logged-in-username {
        display: flex;
        align-self: center;
    }

    .login-avatar {
        background: ${ p => p.theme.primaryColor};
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        margin-left: 16px;
    }
`;

export const HeaderBar = () => {

    // const { keycloak } = useKeycloak();
    return (
        <TopbarSection>
            <Brand>
                <img src="/assets/img/logo.png" alt="ilionx logo" />
            </Brand>

            <LoggedInContainer  role="region">
                <p className="logged-in-username " >
                    {/* { keycloak?.tokenParsed?.preferred_username } */}
                </p>
                <div  className="login-avatar">
                </div>
            </LoggedInContainer>
        </TopbarSection>
    );
};
