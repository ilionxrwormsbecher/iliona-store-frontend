import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunkMiddleware from "redux-thunk";

import store from "./../../store/store";
const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer);

export function render(
    ui,
    injectedReducer,
    { initialState, store = createStore(injectedReducer, initialState, composedEnhancers), ...renderOptions } = {}
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
            </Provider>
        );
    }
    return {
        ...rtlRender(ui, {
            wrapper: Wrapper,
            ...renderOptions,
        }),
        store,
    };
}

export function renderWithoutRouter(ui, { ...renderOptions } = {}) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return {
        ...rtlRender(ui, {
            wrapper: Wrapper,
            ...renderOptions,
        }),
        store,
    };
}

export * from "@testing-library/react";

export function renderWithoutReducer(ui, { ...renderOptions } = {}) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
            </Provider>
        );
    }
    return {
        ...rtlRender(ui, {
            wrapper: Wrapper,
            ...renderOptions,
        }),
        store,
    };
}
