import { createBrowserHistory, createMemoryHistory } from 'history';
import React from 'react'
import { IntlProvider, IntlShape } from 'react-intl';
import { Router } from 'react-router-dom';
import { createReduxHistoryContext } from 'redux-first-history';
import { translationSets } from '../i18n/translations';
import { IReduxApplicationState } from '../models/redux/IReduxApplicationState';
import { CategoriesReducer } from '../store/slices/categories/categoryReducer';
import { PackagesReducer } from '../store/slices/packages/packagesReducer';
import { render } from '../utils/tests/customRender';
import { reduxCategoriesFilled, setFullStore } from '../utils/tests/mockRedux';
import CategoryPackages from './CategoryPackages'; 
import { combineReducers } from "redux";

const { routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory()
});

const rootReducer = () =>
    combineReducers<IReduxApplicationState>({
        packagesSlice: PackagesReducer,
        categorySlice: CategoriesReducer,
        router: routerReducer
    });


function setupTest(reducer: any) {
    const history = createMemoryHistory()

    const {getByRole, getByTestId,  getByText, debug, store} = render(
        <IntlProvider locale={'nl'} messages={translationSets['nl']}>
            <Router location={history.location} navigator={history} >
                <CategoryPackages />
            </Router>
        </IntlProvider>,
        reducer,
        setFullStore
    )

    return { getByRole, getByTestId, getByText, debug, store};
}

test('should render', async () => { 
    const component = setupTest(rootReducer());
    console.log("*****", rootReducer)

    console.log("----", component.store.getState());

});



