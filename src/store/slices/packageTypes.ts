import { IIlionaPackages, IIlionaPackagesAbbreviated } from "../../models/IIlionaPackage";

export enum IlionaPackagesTypes {
    FETCH_ILIONA_PACKAGES_STARTED = "@@FETCH_ILIONA_PACKAGES_STARTED",
    FETCH_ILIONA_PACKAGES_SUCCESS = "@@FETCH_ILIONA_PACKAGES_SUCCESS",
    FETCH_ILIONA_PACKAGES_FAILURE = "@@FETCH_ILIONA_PACKAGES_FAILURE",

    FETCH_ILIONA_INSTALL_PACKAGE_FAILURE = "@@FETCH_ILIONA_INSTALL_PACKAGE_FAILURE",
    FETCH_ILIONA_INSTALL_PACKAGE_STARTED = "@@FETCH_ILIONA_INSTALL_PACKAGE_STARTED",
    FETCH_ILIONA_INSTALL_PACKAGE_SUCCESS = "@@FETCH_ILIONA_INSTALL_PACKAGE_SUCCESS",
}

export type PackagesState = Readonly<{
    ilionaPackages: IIlionaPackagesAbbreviated[];
    errorMessage: string;
    isFetching: boolean;
    packageInstallSuccessful: boolean;
    packageInstallFailed: boolean;
}>
