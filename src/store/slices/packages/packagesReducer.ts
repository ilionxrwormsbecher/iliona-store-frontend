import { IIlionaLocalPackage } from "./../../../models/ilionaLocalPackage";
import { fetchIlionaPackageDetails } from "./packagesActions";
import { IIlionaPackagesAbbreviated } from "./../../../models/IIlionaPackage";
/* eslint-disable indent */
import { IlionaPackagesTypes, PackagesState } from "./packageTypes";
import { IIlionaPackages } from "../../../models/IIlionaPackage";

const initialState: PackagesState = {
    errorMessage: "",
    ilionaPackages: [] as IIlionaPackagesAbbreviated[],
    selectedPackageDetail: [] as IIlionaPackages[],
    isFetching: false,
    packageInstallFailed: false,
    packageInstallSuccessful: false,
    computerName: "",
    subscriptionKey: "",
    locallyInstalledPackages: [] as IIlionaLocalPackage[],
};

export function PackagesReducer(
    state = initialState,
    action: { type: IlionaPackagesTypes; payload: any }
): PackagesState {
    switch (action.type) {
        case IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_STARTED:
            return {
                ...state,
                isFetching: true,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_FAILURE:
            return {
                ...state,
                errorMessage: action?.payload?.errorMessage,
                isFetching: false,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_SUCCESS:
            return {
                ...state,
                ilionaPackages: action.payload.packages.data,
                errorMessage: "",
                isFetching: false,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_PACKAGE_DETAIL_STARTED:
            return {
                ...state,
                isFetching: true,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_PACKAGE_DETAIL_FAILURE:
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
                isFetching: false,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_PACKAGE_DETAIL_SUCCESS:
            return {
                ...state,
                selectedPackageDetail: action.payload.packageDetails.data,
                errorMessage: "",
                isFetching: false,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_INSTALL_PACKAGE_STARTED:
            return {
                ...state,
                isFetching: true,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_INSTALL_PACKAGE_FAILURE:
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
                isFetching: false,
                packageInstallFailed: true,
                packageInstallSuccessful: false,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_INSTALL_PACKAGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                packageInstallFailed: false,
                errorMessage: "",
                packageInstallSuccessful: action.payload.installed,
            };

        case IlionaPackagesTypes.CLOSE_TOAST_MESSAGE:
            return {
                ...state,
                packageInstallSuccessful: false,
            };

        case IlionaPackagesTypes.REMOVE_PACKAGE_ERROR:
            return {
                ...state,
                errorMessage: "",
                packageInstallFailed: false,
                packageInstallSuccessful: false,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_COMPUTER_NAME_STARTED:
            return {
                ...state,
                isFetching: true,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_COMPUTER_NAME_SUCCESS:
            return {
                ...state,
                isFetching: false,
                packageInstallFailed: false,
                errorMessage: "",
                packageInstallSuccessful: false,
                computerName: action.payload.computer,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_COMPUTER_NAME_FAILURE:
            return {
                ...state,
                isFetching: false,
                packageInstallFailed: false,
                errorMessage: action.payload.errorMessage,
                packageInstallSuccessful: false,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_SUBSCRIPTION_KEY_STARTED:
            return {
                ...state,
                isFetching: true,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_SUBSCRIPTION_KEY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                packageInstallFailed: false,
                errorMessage: "",
                packageInstallSuccessful: false,
                subscriptionKey: action.payload?.subscriptionKey,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_SUBSCRIPTION_KEY_FAILURE:
            return {
                ...state,
                isFetching: false,
                packageInstallFailed: false,
                errorMessage: action.payload.errorMessage,
                packageInstallSuccessful: false,
                subscriptionKey: "",
            };

        case IlionaPackagesTypes.FETCH_ILIONA_LOCAL_PACKAGES_STARTED:
            return {
                ...state,
                isFetching: true,
            };

        case IlionaPackagesTypes.FETCH_ILIONA_LOCAL_PACKAGES_FAILURE:
            return {
                ...state,
                isFetching: false,
                packageInstallFailed: false,
                errorMessage: action.payload.errorMessage,
                packageInstallSuccessful: false,
                subscriptionKey: "",
            };

        case IlionaPackagesTypes.FETCH_ILIONA_LOCAL_PACKAGES_SUCCESS:
            console.log("action", action);

            return {
                ...state,
                isFetching: false,
                packageInstallFailed: false,
                errorMessage: "",
                packageInstallSuccessful: false,
                locallyInstalledPackages: action.payload?.packages?.local_packages,
            };

        default: {
            return state;
        }
    }
}
