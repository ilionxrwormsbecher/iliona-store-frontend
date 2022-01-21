import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppCard } from "../components/appCard/AppCard";
import { IIlionaPackages } from "../models/IIlionaPackage";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import { fetchIlionaPackages } from "../store/slices/packagesActions";

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
        <main className="main-content">
            <h1 className="h1-header">Applications</h1>
            <div className="content-area">
                { packageCards }
            </div>
        </main>
    );
};
