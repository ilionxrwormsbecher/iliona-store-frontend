import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IlionaPackagesTypes, PackagesState } from "./packageTypes";
import {
    RequestFailedDispatchType,
    RequestStartedDispatchType,
    RequestSuccessDispatchType,
} from "../../../models/redux/IReduxActionTypes";

export const fetchIlionaPackages = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchIlionaPackagesRequest());
    };
};

// GET all packages with abbreviated
const fetchIlionaPackagesRequest: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = () => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = {
            type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_STARTED,
        };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            requestHeaders.set("x-api-key", process.env.REACT_APP_API_KEY);
            const response: Response = await fetch("https://api.iliona.cloud/store-packages/list/", {
                headers: requestHeaders,
            });

            if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
                const requestFailedAction: RequestFailedDispatchType = {
                    type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_FAILURE,
                    payload: { errorMessage: "Something went wrong" },
                };
                return dispatch(requestFailedAction);
            }

            const result = await response.json();

            const requestSuccessAction: RequestSuccessDispatchType = {
                type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_SUCCESS,
                payload: { packages: result },
            };
            dispatch(requestSuccessAction);
        } catch (error) {
            const requestFailedAction: RequestFailedDispatchType = {
                type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_FAILURE,
                payload: { errorMessage: error },
            };
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

const fetchIlionaPackageDetailsRequest: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = (
    id: string
) => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = {
            type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGE_DETAIL_STARTED,
        };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            requestHeaders.set("x-api-key", process.env.REACT_APP_API_KEY);
            const response: Response = await fetch(`https://api.iliona.cloud/store-packages/get_by_id/${id}`, {
                headers: requestHeaders,
            });

            if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
                const requestFailedAction: RequestFailedDispatchType = {
                    type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_FAILURE,
                    payload: { errorMessage: "Something went wrong" },
                };
                return dispatch(requestFailedAction);
            }
            const result = await response.json();

            const requestSuccessAction: RequestSuccessDispatchType = {
                payload: { packageDetails: result },
                type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGE_DETAIL_SUCCESS,
            };
            dispatch(requestSuccessAction);
        } catch (error) {
            const requestFailedAction: RequestFailedDispatchType = {
                type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGE_DETAIL_FAILURE,
                payload: { errorMessage: error },
            };
            dispatch(requestFailedAction);
        }
    };
};

// GET Install a package
export const InstallPackage = (packageName: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchInstallPackageRequest(packageName));
    };
};

export function closeSuccessInstalledMessage() {
    return { type: IlionaPackagesTypes.CLOSE_TOAST_MESSAGE, payload: { test: "test" } };
}

const fetchInstallPackageRequest: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = (
    packageName: string
) => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = {
            type: IlionaPackagesTypes.FETCH_ILIONA_INSTALL_PACKAGE_STARTED,
        };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            requestHeaders.set("x-api-key", process.env.REACT_APP_API_KEY);
            const response: Response = await fetch(`https://api.iliona.cloud/store-packages/install-package`, {
                method: "POST",
                headers: requestHeaders,
                body: JSON.stringify({
                    packageName: packageName,
                    clientIdentification: "dummyData",
                }),
            });

            console.log("status code", response.status);
            if (response.status === 422) {
                const requestFailedAction: RequestFailedDispatchType = {
                    type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_FAILURE,
                    payload: { errorMessage: "duplicate entry" },
                };
                return dispatch(requestFailedAction);
            }

            if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
                const requestFailedAction: RequestFailedDispatchType = {
                    type: IlionaPackagesTypes.FETCH_ILIONA_INSTALL_PACKAGE_FAILURE,
                    payload: { errorMessage: "Something went wrong" },
                };
                return dispatch(requestFailedAction);
            }

            const requestSuccessAction: RequestSuccessDispatchType = {
                payload: { installed: true },
                type: IlionaPackagesTypes.FETCH_ILIONA_INSTALL_PACKAGE_SUCCESS,
            };
            dispatch(requestSuccessAction);
        } catch (error) {
            const requestFailedAction: RequestFailedDispatchType = {
                type: IlionaPackagesTypes.FETCH_ILIONA_INSTALL_PACKAGE_FAILURE,
                payload: { errorMessage: error },
            };
            dispatch(requestFailedAction);
        }
    };
};
