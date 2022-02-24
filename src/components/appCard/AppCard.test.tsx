import React from 'react'
import AppCard from './AppCard'
import { BrowserRouter } from 'react-router-dom'
import { IntlShape } from "react-intl"
import { CategoriesReducer } from '../../store/slices/categories/categoryReducer'
import { reduxCategoriesFilled } from '../../utils/tests/mockRedux'
import { render } from "../../utils/tests/customRender";
import { intlDutch, intlEnglish, intlChinese } from "../../utils/tests/mockTranslations";
import  userEvent  from "@testing-library/user-event"



function setupTest(intlLanguage: IntlShape, reducer: any) {
  const {getByRole, getByTestId,  getByText, debug, store} = render(
    <BrowserRouter>
      <AppCard  
        title="Docker Desktop" 
        category="aa1ca463-a779-45fe-b1b7-9410521a9a84"
        imageUrl="https://ilionaprod2001.blob.core.windows.net/app-store-logos/dockerLogoResized.png"
        backgroundColor="red"
        summary="Let\'s you run containerized apps" 
        requiresLicense={false} 
        rowkey="22afc55f-b02c-434b-8441-da96023094b7" 
        intl={intlLanguage}
      /> 
    </BrowserRouter>,
    reducer,
    reduxCategoriesFilled
  )

  return { getByRole, getByTestId, getByText, debug, store};
}

test.only('should render the link to the product page succesfully', async () => { 
  const component = setupTest(intlDutch, CategoriesReducer)
  const linkToDetailPage = component.getByRole("link");

  userEvent.click(linkToDetailPage);
  
  expect(linkToDetailPage).toHaveAttribute('href', "/details/22afc55f-b02c-434b-8441-da96023094b7");
  expect(window.location.pathname).toMatchInlineSnapshot(`"/details/22afc55f-b02c-434b-8441-da96023094b7"`);
});

test('should render the category in Dutch', async () => { 
  const component = setupTest(intlDutch, CategoriesReducer)
  const categoryNode = component.getByText(/productiviteitstools/i);

  expect(categoryNode.innerHTML).toContain("Productiviteitstools");
});

test('should render the category in English', async () => { 
  const component = setupTest(intlEnglish, CategoriesReducer)
  const categoryNode = component.getByText(/productivity tools/i);

  expect(categoryNode.innerHTML).toContain("Productivity tools");
});

test('should render the category in Dutch, when language is set to missing language', async () => { 
  const component = setupTest(intlChinese, CategoriesReducer)
  const categoryNode = component.getByText(/productiviteitstools/i);

  expect(categoryNode.innerHTML).toContain("Productiviteitstools");
});

test("should render the name of the product correctly and show a product image", () => {
    const component = setupTest(intlDutch, CategoriesReducer);
    const imageNode = component.getByTestId("packageImage");
    const packageTitleNode = component.getByTestId("packageName")

    expect(imageNode.style).toContain('background-image')
    expect(packageTitleNode.innerHTML).toBe("Docker Desktop");
    
});
