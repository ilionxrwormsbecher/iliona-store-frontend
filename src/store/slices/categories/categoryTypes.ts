import { IIlionaPackages, IIlionaPackagesAbbreviated } from "../../../models/IIlionaPackage";
import { IIlionaCategory } from "../../../models/Ilionacategory";

export enum IlionaCategoryTypes {
    FETCH_ILIONA_CATEGORIES_STARTED = "@@FETCH_ILIONA_CATEGORIES_STARTED",
    FETCH_ILIONA_CATEGORIES_SUCCESS = "@@FETCH_ILIONA_CATEGORIES_SUCCESS",
    FETCH_ILIONA_CATEGORIES_FAILURE = "@@FETCH_ILIONA_CATEGORIES_FAILURE",
}

export type CategoryState = Readonly<{
    categories: IIlionaCategory[];
    errorMessage: string;
    isFetching: boolean;
}>
