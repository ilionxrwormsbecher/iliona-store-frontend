import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render as rtlRender, fireEvent} from '@testing-library/react'
import AppCard from './AppCard'
import { rootReducer } from '../../store/store'
import { BrowserRouter } from 'react-router-dom'
import { createIntl } from "react-intl"
import { CategoriesReducer } from '../../store/slices/categories/categoryReducer'

function render(
    ui,
    {
      initialState,
      store = createStore(CategoriesReducer, initialState),
      ...renderOptions
    } = {},
  ) {
    function Wrapper({children}) {
      return <Provider store={store}>{children}</Provider>
    }
    return {
      ...rtlRender(ui, {
        wrapper: Wrapper,
        ...renderOptions,
      }),
      // adding `store` to the returned utilities to allow us
      // to reference it in our tests (just try to avoid using
      // this to test implementation details).
      store,
    }
  }

test('should render succesfully', async () => { 

  const intl = createIntl({
    locale: 'nl',
    messages: {
      "navigation.category.productivityTools": "Productivity tools",
    }
  })

  const {getByLabelText, getByText, debug, store} = render(
  <BrowserRouter>
  
    <AppCard  
      title="Docker Desktop" 
      category="aa1ca463-a779-45fe-b1b7-9410521a9a84"
      imageUrl="https://ilionaprod2001.blob.core.windows.net/app-store-logos/dockerLogoResized.png"
      backgroundColor="red"
      summary="Let\'s you run containerized apps" 
      requiresLicense={false} 
      rowkey="22afc55f-b02c-434b-8441-da96023094b7" 
      intl={intl}
    /> 
  </BrowserRouter>,
    {
      initialState: {
        categorySlice: {
          errorMessage: '',
          categories: [
            {
              PartitionKey: 'Category',
              RowKey: '36c761fa-8735-4184-8ce5-4d17a767d139',
              IsCustom: 'False',
              Name: 'IntlMultimedia',
              RouteFriendlyName: 'Multimedia'
            },
            {
              PartitionKey: 'Category',
              RowKey: '588ba4ae-5996-4380-9390-fc7e1ff49bf5',
              Name: 'IntlOverig',
              RouteFriendlyName: 'Overig'
            },
            {
              PartitionKey: 'Category',
              RowKey: 'aa1ca463-a779-45fe-b1b7-9410521a9a84',
              IsCustom: 'False',
              Name: 'IntlProductiviteitstools',
              RouteFriendlyName: 'Productiviteitstools'
            },
            {
              PartitionKey: 'Category',
              RowKey: 'b78e9928-0b61-4c12-8c40-036668ef8241',
              IsCustom: 'False',
              Name: 'IntlBedrijfssoftware',
              RouteFriendlyName: 'Bedrijfssoftware'
            },
            {
              PartitionKey: 'Category',
              RowKey: 'c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d',
              IsCustom: 'False',
              Name: 'IntlInternet',
              RouteFriendlyName: 'Internet'
            }
          ],
          isFetching: false
        }
      }
    }
  )

  console.log("---", store.getState());
  debug();

});