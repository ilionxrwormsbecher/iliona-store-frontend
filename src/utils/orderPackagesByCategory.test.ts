import { IIlionaPackages } from "./../models/IIlionaPackage";
import { IIlionaCategory } from "./../models/Ilionacategory";
import React from "react";
import { IntlProvider } from "react-intl";
import { translationSets } from "../i18n/translations";
import { filterPackagesPerCategory } from "./orderPackagesByCategory";
import { render } from "./tests/customRender";
import { IIlionaPackagesAbbreviated } from "../models/IIlionaPackage";

const categories: IIlionaCategory[] = [
    {
        RowKey: "36c761fa-8735-4184-8ce5-4d17a767d139",
        Name: "IntlMultimedia",
        RouteFriendlyName: "Multimedia",
    },
    {
        RowKey: "588ba4ae-5996-4380-9390-fc7e1ff49bf5",
        Name: "IntlOverig",
        RouteFriendlyName: "Overig",
    },
];

const packages: IIlionaPackagesAbbreviated[] = [
    {
        imageUrl: "https://ilionaprod2001.blob.core.windows.net/app-store-logos/google-earth.png",
        packageName: "Google earth",
        displayName: "Google earth",
        summary:
            "Verken satellietbeelden, 3D-gebouwen en 3D-terrein van honderden steden overal ter wereld. Zoom in op je huis of een andere plek en gebruik vervolgens Street View voor een 360\ufffd-perspectief.",
        rowKey: "b291d941-3031-416d-b7f3-5e7417f0b336",
        category: "588ba4ae-5996-4380-9390-fc7e1ff49bf5",
        requiresLicense: false,
    },
    {
        imageUrl: "https://ilionaprod2001.blob.core.windows.net/app-store-logos/ae.png",
        packageName: "After effects",
        displayName: "After effects",
        summary:
            "Create cinematic movie titles, intros, and transitions. Remove an object from a clip. Create a scene with fire or rainfall. Make a logo or character move. You can even navigate and design in a 3D space. With After Effects, the leading software for motion graphics and visual effects, you can bring any idea to life.",
        rowKey: "be9d59a5-5137-4600-b36c-dc9769d25e3b",
        category: "36c761fa-8735-4184-8ce5-4d17a767d139",
        requiresLicense: true,
    },
    {
        imageUrl: "https://ilionaprod2001.blob.core.windows.net/app-store-logos/photoshoplogo.jpg",
        packageName: "Photoshop",
        displayName: "Photoshop",
        summary:
            "Begin met Photoshop. En laat je betoveren. Prachtige afbeeldingen, gedetailleerde illustraties en ongelofelijke kunst \ufffd je maakt het allemaal met Photoshop. ",
        rowKey: "f75743f1-c779-4305-b2c7-b083bd8dd32e",
        category: "36c761fa-8735-4184-8ce5-4d17a767d139",
        requiresLicense: true,
    },
];

test("Should return an empty array", async () => {
    const result = filterPackagesPerCategory([] as IIlionaCategory[], [] as IIlionaPackagesAbbreviated[]);

    expect(result).toStrictEqual([]);
});

test("Should return an array with packages per category", async () => {
    const result = filterPackagesPerCategory(categories, packages);
    expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "name": "Multimedia",
    "packages": Array [
      Object {
        "category": "36c761fa-8735-4184-8ce5-4d17a767d139",
        "displayName": "After effects",
        "imageUrl": "https://ilionaprod2001.blob.core.windows.net/app-store-logos/ae.png",
        "packageName": "After effects",
        "requiresLicense": true,
        "rowKey": "be9d59a5-5137-4600-b36c-dc9769d25e3b",
        "summary": "Create cinematic movie titles, intros, and transitions. Remove an object from a clip. Create a scene with fire or rainfall. Make a logo or character move. You can even navigate and design in a 3D space. With After Effects, the leading software for motion graphics and visual effects, you can bring any idea to life.",
      },
      Object {
        "category": "36c761fa-8735-4184-8ce5-4d17a767d139",
        "displayName": "Photoshop",
        "imageUrl": "https://ilionaprod2001.blob.core.windows.net/app-store-logos/photoshoplogo.jpg",
        "packageName": "Photoshop",
        "requiresLicense": true,
        "rowKey": "f75743f1-c779-4305-b2c7-b083bd8dd32e",
        "summary": "Begin met Photoshop. En laat je betoveren. Prachtige afbeeldingen, gedetailleerde illustraties en ongelofelijke kunst � je maakt het allemaal met Photoshop. ",
      },
    ],
  },
  Object {
    "name": "Overig",
    "packages": Array [
      Object {
        "category": "588ba4ae-5996-4380-9390-fc7e1ff49bf5",
        "displayName": "Google earth",
        "imageUrl": "https://ilionaprod2001.blob.core.windows.net/app-store-logos/google-earth.png",
        "packageName": "Google earth",
        "requiresLicense": false,
        "rowKey": "b291d941-3031-416d-b7f3-5e7417f0b336",
        "summary": "Verken satellietbeelden, 3D-gebouwen en 3D-terrein van honderden steden overal ter wereld. Zoom in op je huis of een andere plek en gebruik vervolgens Street View voor een 360�-perspectief.",
      },
    ],
  },
]
`);
});
