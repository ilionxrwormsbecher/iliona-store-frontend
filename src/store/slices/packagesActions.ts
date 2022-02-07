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


// GET all packages with abbreviated
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
            const parsedResult = JSON.parse(result);

            const requestSuccessAction: RequestSuccessDispatchType = { payload: { packages: parsedResult }, type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_SUCCESS };
            dispatch(requestSuccessAction);
        } catch (error) {
            const requestFailedAction: RequestFailedDispatchType = { errorMessage: error, type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_FAILURE };
            dispatch(requestFailedAction);
        }
    };
};



// GET the details for 1 package
export const fetchIlionaPackageDetails = (id: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchIlionaPackageDetailsRequest(id));
    };
};


const fetchIlionaPackageDetailsRequest: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = (id: string) => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = { type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGE_DETAIL_STARTED };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            requestHeaders.set("x-api-key", apikey);
            const response: Response = await fetch(
                `https://api.iliona.cloud/store-packages/get_by_id/${id}`,
                {
                    headers: requestHeaders
                }
            );

            const result = await response.json();
            const parsedResult = JSON.parse(result);

            console.log('result', parsedResult);

            const requestSuccessAction: RequestSuccessDispatchType = { payload: { packageDetails: parsedResult }, type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGE_DETAIL_SUCCESS };
            dispatch(requestSuccessAction);
        } catch (error) {
            const requestFailedAction: RequestFailedDispatchType = { errorMessage: error, type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGE_DETAIL_FAILURE };
            dispatch(requestFailedAction);
        }
    };
};
