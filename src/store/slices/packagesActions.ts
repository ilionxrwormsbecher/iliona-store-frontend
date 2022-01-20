import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IlionaPackagesTypes, PackagesState } from "./packageTypes";
import { RequestFailedDispatchType, RequestStartedDispatchType, RequestSuccessDispatchType } from "../../models/redux/IReduxActionTypes";
import { apikey } from "../../secrets/apikey";

export const fetchIlionaPackages = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchIlionaPackagesRequest());
    };
};

const fetchIlionaPackagesRequest: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = () => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = { type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_STARTED };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            requestHeaders.set("x-api-key", apikey);
            const response: Response = await fetch(
                "https://api.iliona.cloud/store-packages/list/",
                {
                    headers: requestHeaders
                }
            );

            const result = await response.json();

            const requestSuccessAction: RequestSuccessDispatchType = { payload: { packages: result }, type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_SUCCESS };
            dispatch(requestSuccessAction);
        } catch (error) {
            const requestFailedAction: RequestFailedDispatchType = { errorMessage: error, type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_FAILURE };
            dispatch(requestFailedAction);
        }
    };
};
