import { IIlionaPackagesAbbreviated } from './../../models/IIlionaPackage';
/* eslint-disable indent */
import { IlionaPackagesTypes, PackagesState } from "./packageTypes";
import { IIlionaPackages } from "../../models/IIlionaPackage";

const initialState: PackagesState = {
    errorMessage: "",
    ilionaPackages: {} as IIlionaPackagesAbbreviated[],
    isFetching: false,
    packageInstallFailed: false,
    packageInstallSuccessful: false
};

export function PackagesReducer(
    state = initialState,
    action: { type: IlionaPackagesTypes; payload: any }
): PackagesState {
    switch (action.type) {
        case IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_STARTED:
            return {
                ...state,
                isFetching: true
            };

        case IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_FAILURE:
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
                isFetching: false
            };

        case IlionaPackagesTypes.FETCH_ILIONA_PACKAGES_SUCCESS:
            console.log("reducer", action);

            return {
                ...state,
                ilionaPackages: action.payload.packages,
                isFetching: false
            };
        // case IlionaPackagesTypes.FETCH_ILIONA_INSTALL_PACKAGE_STARTED:
        //     return {
        //         ...state,
        //         isFetching: true
        //     };

        // case IlionaPackagesTypes.FETCH_ILIONA_INSTALL_PACKAGE_FAILURE:
        //     return {
        //         ...state,
        //         errorMessage: action.payload.errorMessage,
        //         isFetching: false,
        //         packageInstallFailed: true
        //     };

        // case IlionaPackagesTypes.FETCH_ILIONA_INSTALL_PACKAGE_SUCCESS:
        //     return {
        //         ...state,
        //         isFetching: false,
        //         packageInstallSuccessful: action.payload.installed
        //     };
        default: {
            return state;
        }

    }
}
