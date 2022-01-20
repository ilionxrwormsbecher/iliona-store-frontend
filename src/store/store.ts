import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createReduxHistoryContext, reachify } from "redux-first-history";
import ThunkMiddleware from "redux-thunk";
import { PackagesReducer } from "./slices/packagesReducer";
import { IReduxApplicationState } from "../models/redux/IReduxApplicationState";


const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory()
    //other options if needed 
});



const rootReducer = () =>
    combineReducers<IReduxApplicationState>({
        packagesSlice: PackagesReducer,
        router: routerReducer
    });

function configureStore() {
    const middleware = [ThunkMiddleware, routerMiddleware];
    const middlewareEnhancer = applyMiddleware(...middleware);

    return createStore(rootReducer(), composeWithDevTools(middlewareEnhancer));
}

const store = configureStore();

export const history = createReduxHistory(store);
export default store;
