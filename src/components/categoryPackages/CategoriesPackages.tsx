import { render } from '@testing-library/react';
import React from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl';
import styled from 'styled-components';
import { translateRoutePaths } from '../../i18n/CategoryTranslations';
import { IIlionaPackagesAbbreviated } from '../../models/IIlionaPackage';
import { IlionaPackageByCategory } from '../../models/IilionaPackagesByCategory'
import AppCard from '../appCard/AppCard';
import { Header1 } from '../html/header/Header';

interface CategoryPackagesProps {
    packagesByCategory: IlionaPackageByCategory[];
}

const ContentArea = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
`;

const CategoriesPackages = ({packagesByCategory, intl}: CategoryPackagesProps & WrappedComponentProps) => {
    let renderItems: any = '';

    if (packagesByCategory && packagesByCategory.length > 0 ) {
        renderItems = packagesByCategory.map((item: IlionaPackageByCategory) => (
            <div key={item.packages[0].displayName}>
                <Header1>{ translateRoutePaths(item.name.toLowerCase(), intl)}</Header1>
                <ContentArea>
                    {
                        item.packages.map((p: IIlionaPackagesAbbreviated) => (
                            <AppCard 
                                key={p?.rowKey}
                                title={ p?.displayName }
                                imageUrl={ p?.imageUrl }
                                summary={p?.summary }
                                category={p?.category}
                                requiresLicense={p?.requiresLicense}
                                rowkey={p?.rowKey}
                                intl={intl}
                            />
                        ))
                    }
                </ContentArea>
            </div>
        ));
    }

    return (
        <div>{renderItems}</div>
    )

}

export default injectIntl(CategoriesPackages);
