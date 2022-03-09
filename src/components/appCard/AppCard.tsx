import React, { HTMLAttributes, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { IntlShape } from "react-intl";
import injectIntl, { WrappedComponentProps } from "react-intl/src/components/injectIntl";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { translateRoutePaths } from "../../i18n/CategoryTranslations";
import { IIlionaCategory } from "../../models/Ilionacategory";
import { IReduxApplicationState } from "../../models/redux/IReduxApplicationState";
import { fetchIlionaCategories } from "../../store/slices/categories/categoryActions";
import { fetchIlionaPackages } from "../../store/slices/packages/packagesActions";
import { Spinner } from "../spinner/Spinner";

interface IAppCardProps {
    title: string;
    category?: string;
    imageUrl?: string;
    price?: string;
    backgroundColor?: string;
    summary?: string;
    requiresLicense?: boolean;
    rowkey: string;
    intl: IntlShape;
    categories: IIlionaCategory[];
}

const CardContainer = styled.div`
    width: 204px;
    height: 330px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-right: 3.2rem;
    margin-bottom: 3.2rem;
`;

const ImageContainer = styled.div`
    width: 100%;
`;

const PackageContentContainer = styled.div`
    width: 100%;
    padding: 8px;
    display: flex;
    flex-direction: column;
`;

const PackageHeader = styled.div`
    font-size: 1.6rem;
    color: ${(p) => p.theme.primaryTextColor};
    height: 20px;
    overflow: hidden;
`;

const PackageCategory = styled.div`
    font-size: 1.4rem;
    color: ${(p) => p.theme.primaryColor};
`;
const PackageLicense = styled.div`
    font-size: 1.4rem;
    margin-top: 16px;
    text-align: right;

    .negative {
        color: #842029;
    }

    .positive {
        color: #0f5132;
    }
`;

const AppCard = ({
    title,
    category,
    imageUrl,
    backgroundColor,
    summary,
    requiresLicense,
    rowkey,
    intl,
    categories,
    ...props
}: IAppCardProps) => {
    let categoryObject;

    const licenseIndication = requiresLicense ? (
        <span className="negative">Licensie vereist</span>
    ) : (
        <span className="positive">Gratis</span>
    );

    if (categories.length > 0) {
        categoryObject = categories.filter((cat) => cat.RowKey === category);
    }

    return (
        <NavLink to={`/details/${rowkey}`} role="link" data-testid="appCardWrapper">
            <CardContainer {...props}>
                <ImageContainer
                    data-testid="packageImage"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        width: "100%",
                        height: "230px",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        padding: "8px",
                    }}
                ></ImageContainer>

                <PackageContentContainer>
                    <PackageHeader data-testid="packageName" title={title}>
                        {title}
                    </PackageHeader>
                    <PackageCategory>
                        {categoryObject &&
                            categoryObject.length > 0 &&
                            translateRoutePaths(categoryObject[0]?.Name, intl)}
                    </PackageCategory>
                    <PackageLicense>{licenseIndication}</PackageLicense>
                </PackageContentContainer>
            </CardContainer>
        </NavLink>
    );
};

export default AppCard;
