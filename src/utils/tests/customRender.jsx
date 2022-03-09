import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunkMiddleware from "redux-thunk";

import { configureStore } from "./../../store/store";
const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer);

export * from "@testing-library/react";

export function renderWithoutReducer(ui, useRouter = true, { ...renderOptions } = {}) {
    const store = configureStore();
    function Wrapper({ children }) {
        if (useRouter) {
            return (
                <Provider store={store}>
                    <BrowserRouter>{children}</BrowserRouter>
                </Provider>
            );
        } else {
            return <Provider store={store}>{children}</Provider>;
        }
    }
    return {
        ...rtlRender(ui, {
            wrapper: Wrapper,
            ...renderOptions,
        }),
        store,
    };
}
