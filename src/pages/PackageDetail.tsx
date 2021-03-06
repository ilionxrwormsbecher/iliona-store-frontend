import React, { useEffect } from 'react';
import { Spinner } from '../components/spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header1, Header2, Header3 } from '../components/html/header/Header';
import { IReduxApplicationState } from '../models/redux/IReduxApplicationState';
import { fetchIlionaPackageDetails, InstallPackage } from '../store/slices/packagesActions';
import { screenSize } from '../themes/global';
import { Alert } from 'react-bootstrap';


const ErrorWrapper = styled.div`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 1 / 13;
    flex-direction: column;
    margin-top:32px;


    @media ${screenSize.tablet} {
        grid-column: 2 / 12;
    }

    @media ${screenSize.desktop} {
        grid-column: 4 / 10;
    }
`;

const DetailPageWrapper = styled.div`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 1 / 13;
    flex-direction: column;
    background: white;

    @media ${screenSize.tablet} {
        grid-column: 2 / 12;
        margin: 3.2rem 0;
    }

    @media ${screenSize.desktop} {
        grid-column: 4 / 10;
        margin: 3.2rem 0;
    }
`;

const HeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;

    @media ${screenSize.tablet} {
        flex-direction: row;
        height: 230px;;
    }
`;

const HeaderLeftSection = styled.div`
    width: 100%;
    justify-content: center;

    @media ${screenSize.tablet} {
        width: 204px;
        justify-content: initial;
    }
`;

const HeaderRightSection = styled.div`
    display: flex;
    width: 100%;
    padding: 16px;
    flex-direction: column;

    @media ${screenSize.tablet} {
        padding: 16px 32px;
        width: calc(100% - 204px);
    }


    .license-text {
        font-size: 1.4rem;

        .license-required {
            color: red;
        }

        .license-not-required {
            color: green;
        }

        i {
            font-style: italic;
        }
    }
`;

const InstallButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    margin: 32px 0;
    align-items: flex-end;

    
    @media ${screenSize.tablet} {
        justify-content: flex-end;
        margin: 0;
 
    }

`;

const InstallButton = styled.button`
    padding: 4px 64px;
    background-color: ${p => p.theme.primaryColor};
    color: white;
    outline: none;
    border: none;
    font-size:14px;
`; 

const DescriptionArea = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 32px;
    width: calc(100% - 32px);

    margin: 32px 0 32px 16px;
    border-bottom: 1px solid ${p => p.theme.borderNeutral};

    @media ${screenSize.tablet} {
        margin: 32px 0 32px 32px;
        width: calc(100% - 64px);
    }

    p {
        font-size: 14px;
    }
`;

const AdditionalInfoHeader = styled.div`
    color: ${p => p.theme.primaryColor};
    font-size: 20px;
    margin-left: 16px;

    @media ${screenSize.tablet} {
        margin-left: 32px;
    }
`;

const AdditionalDetailsWrapper = styled.div`
    display: grid;
    grid-gap: 16px;
    padding: 16px;
    width: 100%;
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 1fr);

    @media ${screenSize.tablet} {
        padding-left: 32px;
        width: calc(100% - 16px);
    }

    .item {
        display: flex;
        width: 100%;
        flex-direction: column;
        font-size: 14px;

    i {
        font-style: italic;
    }

    }
`;

export const PackageDetail = () => {
    let { rowkey } = useParams();

    const dispatch = useDispatch();
    const packageDetails = useSelector((state: IReduxApplicationState) => state.packagesSlice);
    let showSpinner = false;
    let showError = false;

    useEffect(() => {
        dispatch(fetchIlionaPackageDetails(rowkey ? rowkey : ""));
    }, [dispatch]);


    if (packageDetails?.isFetching) {
        showSpinner = true
    }

    if (packageDetails?.errorMessage) {
        showError = true;
    }

    const errorMessage = (
        <ErrorWrapper>
            <Alert variant='danger'>
                Er is iets fout gegaan,probeer het later opnieuw
            </Alert>

        </ErrorWrapper>
    )

    const licenseElement = packageDetails?.selectedPackageDetail[0]?.RequiresLicense ? 
        <span className='license-required'>{packageDetails?.selectedPackageDetail[0]?.LicenseMessage}</span>:
        <span className='license-not-required'>{packageDetails?.selectedPackageDetail[0]?.LicenseMessage}</span>;
        

    const handleInstall = (displayName: string) => {
        console.log('display name', displayName)
        dispatch(InstallPackage(displayName))
    }
    
    return (
        <>
            {showError && errorMessage}
            <DetailPageWrapper>

                {showSpinner && <Spinner /> }    
                
                
                {!showSpinner  && (
                    <>
                        <HeaderWrapper>
                            <HeaderLeftSection>
                                <div style={ { backgroundImage: `url(${packageDetails?.selectedPackageDetail[0]?.ImageUrl})`, maxWidth: '204px', height: '230px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', padding: '8px'}} >

                                </div>
                            </HeaderLeftSection>

                            <HeaderRightSection>
                                <Header1>{packageDetails?.selectedPackageDetail[0]?.DisplayName}</Header1>
                                <div className='license-text'>Categorie: <i>{packageDetails?.selectedPackageDetail[0]?.Category}</i></div>
                                <div className='license-text'>
                                    Licentie: <i>{licenseElement}</i>
                                </div>

                                <InstallButtonWrapper>
                                    <InstallButton onClick={() => handleInstall(packageDetails?.selectedPackageDetail[0]?.DisplayName)}>
                                        Install
                                    </InstallButton>
                                </InstallButtonWrapper>

                            </HeaderRightSection>
                        </HeaderWrapper>

                        <DescriptionArea>
                            <Header3>{packageDetails?.selectedPackageDetail[0]?.DisplayName}</Header3>
                            <p>
                                {packageDetails?.selectedPackageDetail[0]?.Description}
                            </p>
                        </DescriptionArea>

                        <AdditionalInfoHeader>
                            Overige informatie
                        </AdditionalInfoHeader>
                        <AdditionalDetailsWrapper>
                            <div className='item'>
                                <p>Tags</p>
                                <p><i>{packageDetails?.selectedPackageDetail[0]?.Tags}</i></p>    
                            </div>

                            <div className='item'>
                                <p>Benodigheden</p>
                                <p><i>{packageDetails?.selectedPackageDetail[0]?.Dependencies}</i></p>    
                            </div>

                            <div className='item'>
                                <p>Installatietijd</p>
                                <p><i>{packageDetails?.selectedPackageDetail[0]?.InstallationTime}</i></p>    
                            </div>

                            <div className='item'>
                                <p>Herstart benodigd</p>
                                <p><i>{packageDetails?.selectedPackageDetail[0]?.NeedToRestart ? "ja" : "nee"}</i></p>    
                            </div>
                        
                        </AdditionalDetailsWrapper>
                    </>
                )}
            </DetailPageWrapper>
        
        </>
    );
};
