import React, { useEffect, useState } from "react";
import { Spinner } from "../components/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Header1, Header3 } from "../components/html/header/Header";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";
import {
    closeSuccessInstalledMessage,
    fetchComputerName,
    fetchIlionaPackageDetails,
    fetchLocalPackages,
    fetchSubscriptionKey,
    InstallPackage,
} from "../store/slices/packages/packagesActions";
import { screenSize } from "../themes/global";
import { Alert } from "react-bootstrap";
import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl";
import { translateRoutePaths } from "../i18n/CategoryTranslations";
import { checkPackageIsInstalled } from "../utils/general";
import { ErrorMessagesEnum } from "../models/errorsEnum";

const ToastWrapper = styled.div`
    display: flex;
    grid-row: 5 / 6;
    grid-column: 1 / 13;
    flex-direction: column;
    margin-top: 32px;

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
        height: 230px;
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
    background-color: ${(p) => p.theme.primaryColor};
    color: white;
    outline: none;
    border: none;
    font-size: 14px;
`;

const DescriptionArea = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 32px;
    width: calc(100% - 32px);

    margin: 32px 0 32px 16px;
    border-bottom: 1px solid ${(p) => p.theme.borderNeutral};

    @media ${screenSize.tablet} {
        margin: 32px 0 32px 32px;
        width: calc(100% - 64px);
    }

    p {
        font-size: 14px;
    }
`;

const AdditionalInfoHeader = styled.div`
    color: ${(p) => p.theme.primaryColor};
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

const PackageDetail = ({ intl }: WrappedComponentProps) => {
    let { rowkey } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const packageDetails = useSelector((state: IReduxApplicationState) => state.packagesSlice);
    const [showSpinner, setShowSpinner] = useState(true);
    let showError = false;

    useEffect(() => {
        dispatch(fetchIlionaPackageDetails(rowkey ? rowkey : ""));
        dispatch(fetchComputerName());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchLocalPackages(packageDetails.computerName));
        setShowSpinner(false);
    }, [packageDetails.computerName]);

    useEffect(() => {
        if (packageDetails.computerNameError === ErrorMessagesEnum.noCSAClientFound) {
            return navigate("/notallowed", { replace: true });
        }
    }, [packageDetails.computerNameError]);

    if (packageDetails?.errorMessage) {
        showError = true;
    }

    const errorText = intl.formatMessage({
        id: "errormessages.general",
        defaultMessage: "Er is iets fout gegaan, probeer het later opnieuw.",
    });

    let warningText = intl.formatMessage({
        id: "errormessages.deplicate",
        defaultMessage:
            "De applicatie staat momenteel in de wachtrij om geinstalleerd te worden, een ogenblik geduld alstublieft.",
    });

    const errorMessage = (
        <ToastWrapper>
            <Alert variant="danger">{errorText}</Alert>
        </ToastWrapper>
    );
    const warningMessage = (
        <ToastWrapper>
            <Alert variant="warning" aria-label="warning-toast">
                {warningText}
            </Alert>
        </ToastWrapper>
    );

    const succesfullyInstalled = (
        <ToastWrapper>
            <Alert
                onClose={() => dispatch(closeSuccessInstalledMessage())}
                aria-label="success-toast"
                dismissible
                variant="success"
            >
                <FormattedMessage
                    id="details.header.intsalling.message"
                    defaultMessage="De applicatie is toegevoegd aan de wachtrij om geinstalleerd te worden"
                ></FormattedMessage>
            </Alert>
        </ToastWrapper>
    );

    const licenseElement = packageDetails?.selectedPackageDetail[0]?.RequiresLicense ? (
        <span className="license-required">{packageDetails?.selectedPackageDetail[0]?.LicenseMessage}</span>
    ) : (
        <span className="license-not-required">{packageDetails?.selectedPackageDetail[0]?.LicenseMessage}</span>
    );

    const handleInstall = (displayName: string) => {
        dispatch(InstallPackage(displayName, packageDetails?.computerName, packageDetails?.subscriptionKey));
    };

    let isInstalled = false;

    if (packageDetails?.locallyInstalledPackages) {
        isInstalled = checkPackageIsInstalled(
            packageDetails?.locallyInstalledPackages,
            packageDetails?.selectedPackageDetail[0]?.PackageName
        );
    }

    return (
        <>
            {showError && packageDetails?.errorMessage !== ErrorMessagesEnum.duplicatePackage && errorMessage}
            {showError && packageDetails?.errorMessage === ErrorMessagesEnum.duplicatePackage && warningMessage}
            {packageDetails?.packageInstallSuccessful && !packageDetails?.errorMessage && succesfullyInstalled}
            <DetailPageWrapper>
                {(showSpinner || packageDetails?.locallyInstalledPackages?.length === 0) && <Spinner />}

                {!showSpinner && packageDetails?.locallyInstalledPackages?.length > 0 && (
                    <section data-testid="body">
                        <HeaderWrapper>
                            <HeaderLeftSection>
                                <div
                                    style={{
                                        backgroundImage: `url(${packageDetails?.selectedPackageDetail[0]?.ImageUrl})`,
                                        maxWidth: "204px",
                                        height: "230px",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        padding: "8px",
                                    }}
                                ></div>
                            </HeaderLeftSection>

                            <HeaderRightSection>
                                <Header1>{packageDetails?.selectedPackageDetail[0]?.DisplayName}</Header1>
                                <div className="license-text">
                                    <FormattedMessage
                                        id="details.title.category"
                                        defaultMessage="Categorie"
                                    ></FormattedMessage>
                                    :
                                    <i>
                                        {translateRoutePaths(packageDetails?.selectedPackageDetail[0]?.Category, intl)}
                                    </i>
                                </div>
                                <div className="license-text">
                                    <FormattedMessage
                                        id="details.title.license"
                                        defaultMessage="Licentie"
                                    ></FormattedMessage>
                                    :<i> {licenseElement}</i>
                                </div>
                                <div className="installed-text">
                                    <FormattedMessage
                                        id="details.title.installed"
                                        defaultMessage="geïnstalleerd"
                                    ></FormattedMessage>
                                    :
                                    <i data-testid="isInstalled">
                                        {isInstalled ? (
                                            <FormattedMessage id="general.yes" defaultMessage="ja"></FormattedMessage>
                                        ) : (
                                            <FormattedMessage id="general.no" defaultMessage="nee"></FormattedMessage>
                                        )}
                                    </i>
                                </div>

                                <InstallButtonWrapper>
                                    <InstallButton
                                        disabled={packageDetails?.isFetching}
                                        onClick={() =>
                                            handleInstall(packageDetails?.selectedPackageDetail[0]?.PackageName)
                                        }
                                    >
                                        <FormattedMessage
                                            id="details.title.installtext"
                                            defaultMessage="Installeren"
                                        ></FormattedMessage>
                                    </InstallButton>
                                </InstallButtonWrapper>
                            </HeaderRightSection>
                        </HeaderWrapper>

                        <DescriptionArea>
                            <Header3>{packageDetails?.selectedPackageDetail[0]?.DisplayName}</Header3>
                            <p>{packageDetails?.selectedPackageDetail[0]?.Description}</p>
                        </DescriptionArea>

                        <AdditionalInfoHeader>
                            <FormattedMessage
                                id="details.header.otherinfo"
                                defaultMessage="Overige informatie"
                            ></FormattedMessage>
                        </AdditionalInfoHeader>
                        <AdditionalDetailsWrapper>
                            <div className="item">
                                <p>
                                    <FormattedMessage id="details.title.tags" defaultMessage="Tags"></FormattedMessage>
                                </p>
                                <p>
                                    <i>{packageDetails?.selectedPackageDetail[0]?.Tags}</i>
                                </p>
                            </div>

                            <div className="item">
                                <p>
                                    <FormattedMessage
                                        id="details.title.requirements"
                                        defaultMessage="Benodigheden"
                                    ></FormattedMessage>
                                </p>
                                <p>
                                    <i>{packageDetails?.selectedPackageDetail[0]?.Dependencies}</i>
                                </p>
                            </div>

                            <div className="item">
                                <p>
                                    <FormattedMessage
                                        id="details.title.installationtime"
                                        defaultMessage="Installatietijd"
                                    ></FormattedMessage>
                                </p>
                                <p>
                                    <i>{packageDetails?.selectedPackageDetail[0]?.InstallationTime}</i>
                                </p>
                            </div>

                            <div className="item">
                                <p>
                                    <FormattedMessage
                                        id="details.title.restartrequired"
                                        defaultMessage="Herstart nodig"
                                    ></FormattedMessage>
                                </p>
                                <p>
                                    <i>{packageDetails?.selectedPackageDetail[0]?.NeedToRestart ? "ja" : "nee"}</i>
                                </p>
                            </div>
                        </AdditionalDetailsWrapper>
                    </section>
                )}
            </DetailPageWrapper>
        </>
    );
};

export default injectIntl(PackageDetail);
