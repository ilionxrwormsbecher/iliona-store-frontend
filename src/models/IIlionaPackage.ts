
export interface IIlionaPackagesAbbreviated {
    displayName: string;
    imageUrl: string;
    packageName: string;
    rowKey: string;
    summary: string;
    category: string;
    requiresLicense: boolean;
}


export interface IIlionaPackages {
    Category: string;
    Dependencies: string;
    Description: string;
    DisplayName: string;
    ImageUrl: string;
    InstallationTime: number;
    IsAlreadyInstalled: boolean;
    IsVisible: boolean;
    LicenseMessage: string;
    NeedToRestart: boolean
    PackageName: string;
    PartitionKey: string;
    RequiresLicense: boolean;
    RowKey: string;
    Summary: string;
    Tags: string;
    Weight: number;
}
