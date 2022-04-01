import { waitFor } from "@testing-library/react";
import React from "react";
import { checkFileMimetype, checkObjectIsEmpty, checkPackageIsInstalled } from "./general";

const packageList = [
    {
        name: "7zip.install",
        version: "21.7",
    },
    {
        name: "adobereader",
        version: "2022.001.20085",
    },
    {
        name: "BarracudaNAC",
        version: "9.2.1046.0",
    },
];

test("checkObjectIsEmpty --- Should return false when the object passed has keys", async () => {
    const result = checkObjectIsEmpty({ test: 1 });
    expect(result).toBeFalsy();
});

test("checkObjectIsEmpty --- Should return true when the object passed has keys", async () => {
    const resultEmptyObject = checkObjectIsEmpty({});
    expect(resultEmptyObject).toBeTruthy();
});

test("checkPackageIsInstalled --- Should return true when package name is in the package list", () => {
    const result = checkPackageIsInstalled(packageList, "adobereader");
    expect(result).toBeTruthy();
});

test("checkPackageIsInstalled --- Should return false when package name is not in the package list", () => {
    const result = checkPackageIsInstalled(packageList, "abcd");
    expect(result).toBeFalsy();
});
