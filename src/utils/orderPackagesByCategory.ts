import { IIlionaPackagesAbbreviated } from "../models/IIlionaPackage";
import { IlionaPackageByCategory } from "../models/IilionaPackagesByCategory";
import { IIlionaCategory } from "../models/Ilionacategory";

export function filterPackagesPerCategory(categories: IIlionaCategory[], packages: IIlionaPackagesAbbreviated[]) {
    const appsPerCategory = categories?.map((cat: IIlionaCategory) => {
        const packagesThatUseCurrentCategoryId = packages.filter((p: IIlionaPackagesAbbreviated) => {
            if (p.category === cat.RowKey) return p;
        });

        return { name: cat.RouteFriendlyName, packages: packagesThatUseCurrentCategoryId };
    });

    return appsPerCategory;
}
