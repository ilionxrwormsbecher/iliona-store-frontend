export interface IIlionaPackages {
    Id: string;
    Version: string;
    NormalizedVersion: string;
    IsPrerelease: string; // boolean
    Title: string;
    Authors: string;
    Owners: string;
    IconUrl: string;
    LicenseUrl: string;
    ProjectUrl: string;
    DownloadCount: string; // number
    RequireLicenseAcceptance: string; // boolean
    DevelopmentDependency: string; // boolean
    Description: string;
    Summary: string;
    ReleaseNotes: string;
    Published: string; // boolean || Date
    LastUpdated: string; // Date
    Dependencies: string;
    PackageHash: string;
    PackageHashAlgorithm: string;
    PackageSize: string; // number
    Copyright: string;
    Tags: string;
    IsAbsoluteLatestVersion: string; // boolean
    IsLatestVersion: string; // boolean
    Listed: string;
    VersionDownloadCount: string; // number
    MinClientVersion: string;
    Language: string;
}
