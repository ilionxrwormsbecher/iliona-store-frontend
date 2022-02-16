import { IlionaPackagesTypes } from './../packages/packageTypes';
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IlionaCategoryTypes, CategoryState } from "./categoryTypes";
import { RequestFailedDispatchType, RequestStartedDispatchType, RequestSuccessDispatchType } from "../../../models/redux/IReduxActionTypes";

export const fetchIlionaCategories = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchIlionaCategoriesRequest());
    };
};

// GET all packages with abbreviated
const fetchIlionaCategoriesRequest: ActionCreator<ThunkAction<Promise<any>, CategoryState, null, any>> = () => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = { type: IlionaCategoryTypes.FETCH_ILIONA_CATEGORIES_STARTED };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            requestHeaders.set("x-api-key", process.env.REACT_APP_API_KEY);
            const response: Response = await fetch(
                "https://api.iliona.cloud/store-packages/categories",
                {
                    headers: requestHeaders
                }
            );

            if (response && response.status !== 200 && response.status !== 201 && response.status !== 204 ) {
                const requestFailedAction: RequestFailedDispatchType = { type: IlionaCategoryTypes.FETCH_ILIONA_CATEGORIES_FAILURE,  payload: {errorMessage: 'Something went wrong' } };
                dispatch(requestFailedAction);
            }

            const result = await response.json();
            const parsedResult = JSON.parse(result);

            const requestSuccessAction: RequestSuccessDispatchType = {  type: IlionaCategoryTypes.FETCH_ILIONA_CATEGORIES_SUCCESS, payload: { categories: parsedResult } };
            dispatch(requestSuccessAction);
        } catch (error: any) {
            const requestFailedAction: RequestFailedDispatchType = { type: IlionaCategoryTypes.FETCH_ILIONA_CATEGORIES_FAILURE,  payload: {errorMessage: "Something went wrong" } };
            dispatch(requestFailedAction);
        }
    };
};


