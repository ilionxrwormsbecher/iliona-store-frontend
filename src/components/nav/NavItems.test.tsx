import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider, IntlShape } from "react-intl"
import { CategoriesReducer } from '../../store/slices/categories/categoryReducer'
import { reduxCategoriesFilled } from '../../utils/tests/mockRedux'
import { render } from "../../utils/tests/customRender";
import { intlDutch, intlEnglish, intlChinese } from "../../utils/tests/mockTranslations";
import NavItems from './NavItems'
import { translationSets } from '../../i18n/translations'



function setupTest(reducer: any) {
  const {getByRole, getByTestId,  getByText, getAllByRole, getAllByTestId, debug, store} = render(
    <IntlProvider locale={'nl'} messages={translationSets['nl']}>
        <BrowserRouter>
            <NavItems /> 
        </BrowserRouter>
    </IntlProvider>,
    reducer,
    reduxCategoriesFilled
  )

  return { getByRole, getByTestId, getByText, getAllByRole, getAllByTestId, debug, store};
}

test('should render 6 links', async () => { 
    const component = setupTest(CategoriesReducer);
    const links = component.getAllByRole('listitem') 
    expect(links).toHaveLength(reduxCategoriesFilled.initialState.categorySlice.categories.length + 1)
});

test('Links should have their href attribute filled', async () => { 
    const component = setupTest(CategoriesReducer);
    const links = component.getAllByTestId('dynamicLink');
    const homeLink = component.getByTestId("homeLink");

    expect(homeLink).toHaveAttribute("href", "/");

    links.map((link: any) => {
        expect(link).toHaveAttribute('href');
    });
});

