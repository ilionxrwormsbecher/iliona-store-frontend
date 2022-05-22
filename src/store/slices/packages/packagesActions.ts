import { ErrorMessagesEnum } from "./../../../models/errorsEnum";
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IlionaPackagesTypes, PackagesState } from "./packageTypes";
import {
    RequestFailedDispatchType,
    RequestStartedDispatchType,
    RequestSuccessDispatchType,
} from "../../../models/redux/IReduxActionTypes";
import { IAddPackage } from "../../../models/IAddPackage";
import { data } from "msw/lib/types/context";

export const fetchIlionaPackages = (subscriptionKey: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchIlionaPackagesRequest(subscriptionKey));
    };
};

// GET all packages with abbreviated
const fetchIlionaPackagesRequest: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = (
    subscriptionKey
) => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = {
            type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_STARTED,
        };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            requestHeaders.set("x-api-key", subscriptionKey);
            const response: Response = await fetch(`${process.env.REACT_APP_API_URL}list/`, {
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
export const fetchIlionaPackageDetails = (id: string, subscriptionKey: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchIlionaPackageDetailsRequest(id, subscriptionKey));
    };
};

const fetchIlionaPackageDetailsRequest: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = (
    id: string,
    subscriptionKey: string
) => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = {
            type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGE_DETAIL_STARTED,
        };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            requestHeaders.set("x-api-key", subscriptionKey);
            const response: Response = await fetch(`${process.env.REACT_APP_API_URL}get_by_id/${id}`, {
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
export const InstallPackage = (
    packageName: string,
    computerName: string,
    isSilentInstall: boolean,
    subscriptionKey: string,
    endpoint: string
) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchInstallPackageRequest(packageName, computerName, isSilentInstall, subscriptionKey, endpoint));
    };
};

export function closeSuccessInstalledMessage() {
    return { type: IlionaPackagesTypes.CLOSE_TOAST_MESSAGE };
}

export function removePackageError() {
    return { type: IlionaPackagesTypes.REMOVE_PACKAGE_ERROR };
}

const fetchInstallPackageRequest: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = (
    packageName: string,
    computerName: string,
    isSilentInstall: boolean,
    subscriptionKey: string,
    endpoint: string
) => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = {
            type: IlionaPackagesTypes.FETCH_ILIONA_INSTALL_PACKAGE_STARTED,
        };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            requestHeaders.set("x-api-key", subscriptionKey);
            const response: Response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
                method: "POST",
                headers: requestHeaders,
                body: JSON.stringify({
                    packageName: packageName,
                    clientIdentification: computerName,
                    isSilentInstall: isSilentInstall,
                    subscriptionKey: subscriptionKey,
                }),
            });

            if (response.status === 422) {
                const requestFailedAction: RequestFailedDispatchType = {
                    type: IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_FAILURE,
                    payload: { errorMessage: ErrorMessagesEnum.duplicatePackage },
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

// GET Conmputer name
export const fetchComputerName = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchIlionaComputerNameRequest());
    };
};

const fetchIlionaComputerNameRequest: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = () => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = {
            type: IlionaPackagesTypes.FETCH_ILIONA_COMPUTER_NAME_STARTED,
        };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            const response: Response = await fetch(
                `http://localhost:${process.env.REACT_APP_STOREFRONT_PORT}/computer`,
                {
                    headers: requestHeaders,
                }
            );

            if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
                const requestFailedAction: RequestFailedDispatchType = {
                    type: IlionaPackagesTypes.FETCH_ILIONA_COMPUTER_NAME_FAILURE,
                    payload: { errorMessage: ErrorMessagesEnum.noCSAClientFound },
                };
                return dispatch(requestFailedAction);
            }
            const result = await response.json();

            const requestSuccessAction: RequestSuccessDispatchType = {
                payload: { computer: result.computer_name },
                type: IlionaPackagesTypes.FETCH_ILIONA_COMPUTER_NAME_SUCCESS,
            };
            dispatch(requestSuccessAction);
        } catch (error) {
            const requestFailedAction: RequestFailedDispatchType = {
                type: IlionaPackagesTypes.FETCH_ILIONA_COMPUTER_NAME_FAILURE,
                payload: { errorMessage: ErrorMessagesEnum.noCSAClientFound },
            };
            dispatch(requestFailedAction);
        }
    };
};

// GET Conmputer name
export const fetchSubscriptionKey = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchIlionaSubscriptionKeyRequest());
    };
};

const fetchIlionaSubscriptionKeyRequest: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = () => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = {
            type: IlionaPackagesTypes.FETCH_ILIONA_SUBSCRIPTION_KEY_STARTED,
        };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            const response: Response = await fetch(
                `http://localhost:${process.env.REACT_APP_STOREFRONT_PORT}/subscriptionkey`,
                {
                    headers: requestHeaders,
                }
            );

            if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
                const requestFailedAction: RequestFailedDispatchType = {
                    type: IlionaPackagesTypes.FETCH_ILIONA_SUBSCRIPTION_KEY_FAILURE,
                    payload: { errorMessage: "Something went wrong" },
                };
                return dispatch(requestFailedAction);
            }
            const result = await response.json();

            const requestSuccessAction: RequestSuccessDispatchType = {
                payload: { subscriptionKey: result.subscription_key },
                type: IlionaPackagesTypes.FETCH_ILIONA_SUBSCRIPTION_KEY_SUCCESS,
            };
            dispatch(requestSuccessAction);
        } catch (error) {
            const requestFailedAction: RequestFailedDispatchType = {
                type: IlionaPackagesTypes.FETCH_ILIONA_SUBSCRIPTION_KEY_FAILURE,
                payload: { errorMessage: error },
            };
            dispatch(requestFailedAction);
        }
    };
};

// GET Local packages
export const fetchLocalPackages = (computerName: string, subscriptionKey: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchIlionaLocalPackages(computerName, subscriptionKey));
    };
};

const fetchIlionaLocalPackages: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = (
    computerName: string,
    subscriptionKey: string
) => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = {
            type: IlionaPackagesTypes.FETCH_ILIONA_LOCAL_PACKAGES_STARTED,
        };
        dispatch(requestStartedAction);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("Content-Type", "application/json");
            requestHeaders.set("x-api-key", subscriptionKey);
            const response: Response = await fetch(
                `http://localhost:${process.env.REACT_APP_STOREFRONT_PORT}/localpackages`,
                {
                    headers: requestHeaders,
                }
            );

            if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
                const requestFailedAction: RequestFailedDispatchType = {
                    type: IlionaPackagesTypes.FETCH_ILIONA_LOCAL_PACKAGES_FAILURE,
                    payload: { errorMessage: "Something went wrong" },
                };
                return dispatch(requestFailedAction);
            }
            const result = await response.json();

            const requestSuccessAction: RequestSuccessDispatchType = {
                payload: { packages: result },
                type: IlionaPackagesTypes.FETCH_ILIONA_LOCAL_PACKAGES_SUCCESS,
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

// POST add a package to the appstore
export const AddPackageRedux = (packageData: IAddPackage, image: any, subscriptionkey: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(AddPackageRequest(packageData, image, subscriptionkey));
    };
};

const AddPackageRequest: ActionCreator<ThunkAction<Promise<any>, PackagesState, null, any>> = (
    packageData: IAddPackage,
    image: any,
    subscriptionKey: string
) => {
    return async (dispatch: Dispatch) => {
        const requestStartedAction: RequestStartedDispatchType = {
            type: IlionaPackagesTypes.ILIONA_ADD_PACKAGE_STARTED,
        };
        dispatch(requestStartedAction);

        const formData = new FormData();
        formData.append("incoming_file", image);

        try {
            const requestHeaders: any = new Headers();
            requestHeaders.set("x-api-key", subscriptionKey);
            const response: Response = await fetch(`${process.env.REACT_APP_API_URL}files/`, {
                method: "POST",
                headers: requestHeaders,
                body: formData,
            });

            if (response.status === 200 || response.status === 201 || response.status === 204) {
                const body = JSON.stringify(packageData);

                const requestHeadersAddPackage: any = new Headers();
                requestHeadersAddPackage.set("Content-Type", "application/json");
                requestHeadersAddPackage.set("x-api-key", subscriptionKey);

                const responseForPackage: Response = await fetch(`${process.env.REACT_APP_API_URL}add-package`, {
                    method: "POST",
                    headers: requestHeadersAddPackage,
                    body,
                });

                if (
                    responseForPackage.status !== 200 &&
                    responseForPackage.status !== 201 &&
                    responseForPackage.status !== 204
                ) {
                    const requestFailedAction: RequestFailedDispatchType = {
                        type: IlionaPackagesTypes.ILIONA_ADD_PACKAGE_FAILURE,
                        payload: { errorMessage: "Something went wrong" },
                    };
                    return dispatch(requestFailedAction);
                }
                const result = await responseForPackage.json();

                const requestSuccessAction: RequestSuccessDispatchType = {
                    payload: { packages: result },
                    type: IlionaPackagesTypes.ILIONA_ADD_PACKAGE_SUCCESS,
                };
                dispatch(requestSuccessAction);
            }
        } catch (error) {
            const requestFailedAction: RequestFailedDispatchType = {
                type: IlionaPackagesTypes.ILIONA_ADD_PACKAGE_FAILURE,
                payload: { errorMessage: error },
            };
            dispatch(requestFailedAction);
        }
    };
};
