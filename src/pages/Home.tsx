import React, { useEffect } from "react";
import { Spinner } from "../components/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppCard } from "../components/appCard/AppCard";
import { Header1 } from "../components/html/header/Header";
import { IIlionaPackages, IIlionaPackagesAbbreviated } from "../models/IIlionaPackage";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import { fetchIlionaPackages } from "../store/slices/packages/packagesActions";
import { Alert } from "react-bootstrap";

const MainContent = styled.main`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 2 / 12;
    margin: 3.2rem 0;
    flex-direction: column;
`;

const ContentArea = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
`;


export const Home = () => {
    const packages = useSelector((state: IReduxApplicationState) => state.packagesSlice);
    const dispatch = useDispatch();
    let packageCards = [] as JSX.Element[];
    let showSpinner = false;
    let showError = false;

    useEffect(() => {
        dispatch(fetchIlionaPackages());
    }, [dispatch]);

    if (packages?.isFetching) {
        showSpinner = true
    }


    if (packages.ilionaPackages.length > 0) {
        packageCards = packages.ilionaPackages.map((packageApp: IIlionaPackagesAbbreviated) => (
            <AppCard 
                key={packageApp?.rowKey}
                title={ packageApp?.displayName }
                imageUrl={ packageApp?.imageUrl }
                summary={packageApp?.summary }
                category={packageApp?.category}
                requiresLicense={packageApp?.requiresLicense}
                rowkey={packageApp?.rowKey}
            />
        ));
    }

    if (packages?.errorMessage) {
        showError = true;
    }

    const errorMessage = (
        <Alert variant='danger'>
            Er is iets fout gegaan,probeer het later opnieuw
        </Alert>
    )

    const content = (
        <>
            <Header1>Applications</Header1>
            <ContentArea>
                { packageCards }
            </ContentArea>
        </>
    )

    return (
        <MainContent>
            {showSpinner && <Spinner />}
            {showError && errorMessage}

            {!showSpinner && content }
        </MainContent>
    );
};
