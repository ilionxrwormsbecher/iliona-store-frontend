import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppCard } from "../components/appCard/AppCard";
import { Header1 } from "../components/html/header/Header";
import { IIlionaPackages } from "../models/IIlionaPackage";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import { fetchIlionaPackages } from "../store/slices/packagesActions";

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

    useEffect(() => {
        dispatch(fetchIlionaPackages());
    }, [dispatch]);


    if (packages.ilionaPackages.length > 0) {
        packageCards = packages.ilionaPackages.map((packageApp: IIlionaPackages) => (
            <AppCard 
                key={ packageApp?.Title } 
                title={ packageApp?.Title }
                imageUrl={ packageApp?.IconUrl }
            />
        ));
    }

    console.log("packages", packages);

    return (
        <MainContent>
            <Header1>Applications</Header1>
            <ContentArea>
                { packageCards }
            </ContentArea>
        </MainContent>
    );
};
