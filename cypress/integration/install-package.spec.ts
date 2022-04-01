import { localPackagesMOCK } from "./../../src/mocks/mockData";
import { rest } from "msw";

describe("Installing packages", () => {
    it("test the flow of installing a package", () => {
        cy.visit("/");

        //cy.findByRole("button");
        cy.window().then((window) => {
            const { worker } = window.msw;
            worker.use(
                rest.get(`https://api.iliona.cloud/store-packages/categories`, (req, res, ctx) => {
                    return res(
                        ctx.json({
                            data: [
                                {
                                    PartitionKey: "Category",
                                    RowKey: "b78e9928-0b61-4c12-8c40-036668ef8241",
                                    IsCustom: "False",
                                    Name: "IntlBedrijfssoftware",
                                    RouteFriendlyName: "Bedrijfssoftware",
                                },
                                {
                                    PartitionKey: "Category",
                                    RowKey: "c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d",
                                    IsCustom: "False",
                                    Name: "IntlInternet",
                                    RouteFriendlyName: "Internet",
                                },
                                {
                                    PartitionKey: "Category",
                                    RowKey: "36c761fa-8735-4184-8ce5-4d17a767d139",
                                    IsCustom: "False",
                                    Name: "IntlMultimedia",
                                    RouteFriendlyName: "Multimedia",
                                },
                                {
                                    PartitionKey: "Category",
                                    RowKey: "588ba4ae-5996-4380-9390-fc7e1ff49bf5",
                                    Name: "IntlOverig",
                                    RouteFriendlyName: "Overig",
                                },
                                {
                                    PartitionKey: "Category",
                                    RowKey: "aa1ca463-a779-45fe-b1b7-9410521a9a84",
                                    IsCustom: "False",
                                    Name: "IntlProductiviteitstools",
                                    RouteFriendlyName: "Productiviteitstools",
                                },
                            ],
                        })
                    );
                }),
                rest.get(
                    `https://api.iliona.cloud/store-packages/get_by_id/a2898a96-4247-4708-87f4-f3bf44cf351b`,
                    (req, res, ctx) => {
                        return res(
                            ctx.json({
                                data: [
                                    {
                                        PartitionKey: "app",
                                        RowKey: "a2898a96-4247-4708-87f4-f3bf44cf351b",
                                        Category: "b78e9928-0b61-4c12-8c40-036668ef8241",
                                        Dependencies: "",
                                        Description:
                                            "Alle tools die je nodig hebt om pdf's te converteren, bewerken, ondertekenen.",
                                        DisplayName: "Adobe Acrobat Pro",
                                        ImageUrl:
                                            "https://ilionaprod2001.blob.core.windows.net/app-store-logos/acrobat-172.png",
                                        InstallationTime: 10,
                                        IsAlreadyInstalled: false,
                                        IsVisible: true,
                                        LicenseMessage: "Licentie",
                                        NeedToRestart: false,
                                        PackageName: "ILX-AdobePro",
                                        RequiresLicense: false,
                                        Summary:
                                            "Alle tools die je nodig hebt om pdf's te converteren, bewerken, ondertekenen.",
                                        Tags: "",
                                        Weight: 3,
                                        PublishDate: "2020-12-11T16:11:29.3221949Z",
                                    },
                                ],
                            })
                        );
                    }
                ),
                rest.get(
                    `https://api.iliona.cloud/store-packages/get_by_id/a2898a96-4247-4708-87f4-f3bf44cf351b`,
                    (req, res, ctx) => {
                        return res(
                            ctx.json({
                                data: [
                                    {
                                        PartitionKey: "app",
                                        RowKey: "a2898a96-4247-4708-87f4-f3bf44cf351b",
                                        Category: "b78e9928-0b61-4c12-8c40-036668ef8241",
                                        Dependencies: "",
                                        Description:
                                            "Alle tools die je nodig hebt om pdf's te converteren, bewerken, ondertekenen.",
                                        DisplayName: "Adobe Acrobat Pro",
                                        ImageUrl:
                                            "https://ilionaprod2001.blob.core.windows.net/app-store-logos/acrobat-172.png",
                                        InstallationTime: 10,
                                        IsAlreadyInstalled: false,
                                        IsVisible: true,
                                        LicenseMessage: "Licentie",
                                        NeedToRestart: false,
                                        PackageName: "ILX-AdobePro",
                                        RequiresLicense: false,
                                        Summary:
                                            "Alle tools die je nodig hebt om pdf's te converteren, bewerken, ondertekenen.",
                                        Tags: "",
                                        Weight: 3,
                                        PublishDate: "2020-12-11T16:11:29.3221949Z",
                                    },
                                ],
                            })
                        );
                    }
                ),
                rest.get(`https://api.iliona.cloud/store-packages/list/`, (req, res, ctx) => {
                    return res(
                        ctx.json({
                            data: [
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/acrobat-172.png",
                                    packageName: "ILX-AdobePro",
                                    displayName: "Adobe Acrobat Pro",
                                    summary:
                                        "Alle tools die je nodig hebt om pdf's te converteren, bewerken, ondertekenen.",
                                    rowKey: "a2898a96-4247-4708-87f4-f3bf44cf351b",
                                    category: "b78e9928-0b61-4c12-8c40-036668ef8241",
                                    requiresLicense: false,
                                    weight: 3,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/axis-172.png",
                                    packageName: "ILX-AXISCompanion",
                                    displayName: "AXIS Companion",
                                    summary: "Companion video management software, geschikt tot maximaal 16 camera's.",
                                    rowKey: "48c24b23-61b3-493b-8595-8dedc1d330e7",
                                    category: "588ba4ae-5996-4380-9390-fc7e1ff49bf5",
                                    requiresLicense: false,
                                    weight: 4,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/filezilla-172.png",
                                    packageName: "ILX-FileZilla",
                                    displayName: "Filezilla",
                                    summary:
                                        "FileZilla is een opensource-FTP-programma voor Windows, Mac, Linux en FreeBSD. ",
                                    rowKey: "502556e7-c315-4d1c-b4f0-993be62adace",
                                    category: "c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d",
                                    requiresLicense: false,
                                    weight: 5,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/firefox.png",
                                    packageName: "ILX-Firefox-AU",
                                    displayName: "Mozilla Firefox",
                                    summary:
                                        "De browser die beschermt wat belangrijk is. Geen schimmig privacybeleid of achterdeurtjes voor adverteerders. ",
                                    rowKey: "afb95d81-521b-4510-b56a-a22c3f348490",
                                    category: "c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d",
                                    requiresLicense: false,
                                    weight: 6,
                                },
                                {
                                    imageUrl: "https://ilionaprod2001.blob.core.windows.net/app-store-logos/chrome.png",
                                    packageName: "ILX-GoogleChrome-AU",
                                    displayName: "Google Chrome",
                                    summary:
                                        "Browsen met de kracht van Google. Met Google-apps zoals Gmail, Google Pay en de Google Assistent kan Chrome je helpen productief te blijven en kun je meer uit je browser halen.",
                                    rowKey: "1cd7aebd-34d5-45ae-b400-289cd24f3795",
                                    category: "c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d",
                                    requiresLicense: false,
                                    weight: 7,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/jabra-172.png",
                                    packageName: "ILX-JabraDirect",
                                    displayName: "Jabra Direct",
                                    summary:
                                        "Jabra Direct zorgt ervoor dat uw headset altijd over de nieuwste firmware beschikt, zodat u verzekerd bent van de meest recente functies, bugfixes en eenvoudige toegang tot compatibiliteitsupdates. ",
                                    rowKey: "38df447a-5596-4d1b-93e4-1ad2d6f7c56a",
                                    category: "588ba4ae-5996-4380-9390-fc7e1ff49bf5",
                                    requiresLicense: false,
                                    weight: 8,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/keepass-172.png",
                                    packageName: "ILX-Keepass",
                                    displayName: "Keepass",
                                    summary:
                                        "Keepass is in tegenstelling tot de andere software die we hier behandelen, is Keepass per definitie geen clouddienst met een freemiummodel eraan.",
                                    rowKey: "126535d8-a49e-4ec6-abf4-c26fccac4e9b",
                                    category: "aa1ca463-a779-45fe-b1b7-9410521a9a84",
                                    requiresLicense: false,
                                    weight: 9,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/edge-172.png",
                                    packageName: "ILX-microsoft-edge-AU",
                                    displayName: "Microsoft Edge",
                                    summary: "Microsoft Edge is de beste browser voor Windows. ",
                                    rowKey: "20062fa5-7f98-4ca4-b100-7ebd0f063f5b",
                                    category: "c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d",
                                    requiresLicense: false,
                                    weight: 10,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/teams-172.png",
                                    packageName: "ilx-microsoft-teams",
                                    displayName: "Microsoft Teams",
                                    summary: "Communiceer met je teamleden in Microsoft Teams. ",
                                    rowKey: "201f46dd-37e6-4743-b295-547dffaff0d4",
                                    category: "b78e9928-0b61-4c12-8c40-036668ef8241",
                                    requiresLicense: false,
                                    weight: 11,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/ondedrive-172.png",
                                    packageName: "ILX-Onedrive-AU",
                                    displayName: "Ondedrive",
                                    summary:
                                        "Persoonlijke cloudopslag in OneDrive. Sla je foto's en bestanden op in OneDrive, en open ze vanaf elk apparaat, overal.",
                                    rowKey: "bd0873d5-7787-449c-8192-830a71910502",
                                    category: "c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d",
                                    requiresLicense: false,
                                    weight: 12,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/paintnet-172.png",
                                    packageName: "ILX-PaintNET",
                                    displayName: "Paint.NET",
                                    summary:
                                        "Paint.NET is een grafisch beeldbewerkingsprogramma en gratis te downloaden",
                                    rowKey: "5456a31a-b06b-4c66-9bf9-86ddf8d23e38",
                                    category: "36c761fa-8735-4184-8ce5-4d17a767d139",
                                    requiresLicense: false,
                                    weight: 13,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/powerbi.png",
                                    packageName: "ILX-PowerBI",
                                    displayName: "PowerBI",
                                    summary:
                                        "Power BI is een business intelligence (BI) oplossing van Microsoft die de afgelopen jaren snel marktaandeel heeft veroverd. ",
                                    rowKey: "a0acc2a2-75ea-453a-bf29-f20edd47496d",
                                    category: "b78e9928-0b61-4c12-8c40-036668ef8241",
                                    requiresLicense: false,
                                    weight: 14,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/screen-to-gif-172.png",
                                    packageName: "ILX-ScreenToGif",
                                    displayName: "Screen to Gif",
                                    summary:
                                        "ScreenToGif is een open source applicatie om schermopnamen te maken van je Windows pc. ",
                                    rowKey: "53ac4a0e-bab7-48ac-a3a9-61ec7eacf3d3",
                                    category: "36c761fa-8735-4184-8ce5-4d17a767d139",
                                    requiresLicense: false,
                                    weight: 15,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/kpn-172.png",
                                    packageName: "KPNInContact",
                                    displayName: "KPN telecom centrale software",
                                    summary:
                                        "Met InContact kunt u vanuit een interface de beschikbaarheid van uw collega's zien, chatten, bellen, vergaderen en samenwerken. ",
                                    rowKey: "5d4fbf9f-734a-4ee3-ab28-eca06fa0ea32",
                                    category: "588ba4ae-5996-4380-9390-fc7e1ff49bf5",
                                    requiresLicense: false,
                                    weight: 16,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/linkus-172.png",
                                    packageName: "Linkus",
                                    displayName: "Linkus",
                                    summary:
                                        "Linkus Desktop Client geeft u toegang tot zakelijke telefonie-functies vanaf de desktop van uw computer.",
                                    rowKey: "5cc42da6-ba9f-4e32-8b30-7892ba7d33cf",
                                    category: "588ba4ae-5996-4380-9390-fc7e1ff49bf5",
                                    requiresLicense: false,
                                    weight: 17,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/vodafone%3Done-172.png",
                                    packageName: "Vodafone-OneIntegrate-ucclient",
                                    displayName: "Vodafone Telefoon Centrale software",
                                    summary:
                                        "De One Sync applicatie van Vodafone One Net is bedoeld om u nog beter te laten communiceren en optimaal gebruik te laten maken van de mogelijkheden die One Net biedt",
                                    rowKey: "b8a223ed-b355-4459-bb00-2ca579703414",
                                    category: "588ba4ae-5996-4380-9390-fc7e1ff49bf5",
                                    requiresLicense: false,
                                    weight: 18,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/xerox-172.png",
                                    packageName: "XeroxWorkplaceCloudClient",
                                    displayName: "Xereox print",
                                    summary:
                                        "Het volledige softwareplatform voor verificatie, beveiliging, kostenbeheersing en mobiliteit.",
                                    rowKey: "89899039-7bff-41ea-b90a-0c7e9a8cb093",
                                    category: "b78e9928-0b61-4c12-8c40-036668ef8241",
                                    requiresLicense: false,
                                    weight: 19,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/keeper-172.png",
                                    packageName: "keeper",
                                    displayName: "Keeper",
                                    summary:
                                        "Verbeter de cyberbeveiliging van uw bedrijf en controleer de wachtwoordgewoonten. Veilig wachtwoorden opslaan en delen. De beste cyberbeveiligingssoftware voor bedrijven.",
                                    rowKey: "202ebd73-6991-4088-94b8-3d166ae3646d",
                                    category: "b78e9928-0b61-4c12-8c40-036668ef8241",
                                    requiresLicense: false,
                                    weight: 40,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/audacity-172.png",
                                    packageName: "audacity",
                                    displayName: "Audacity",
                                    summary:
                                        "Audacity is opensource-geluidsbewerkingsprogramma waarmee het mogelijk is WAV-, AIFF-, Ogg Vorbis-, en MP3-bestanden te maken, te bewerken en op te slaan",
                                    rowKey: "22f3046f-2caa-4108-90e4-61377450f3fa",
                                    category: "36c761fa-8735-4184-8ce5-4d17a767d139",
                                    requiresLicense: false,
                                    weight: 41,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/obs-172.png",
                                    packageName: "obs.studio.install",
                                    displayName: "Open Broadcasting Studio",
                                    summary:
                                        "OBS Studio is een gratis, open-source en platformonafhankelijke screencasting- en streaming-app.",
                                    rowKey: "0f941bd9-9d1d-4617-8616-c6592be7a2ac",
                                    category: "36c761fa-8735-4184-8ce5-4d17a767d139",
                                    requiresLicense: false,
                                    weight: 42,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/adobe-reader-172.png",
                                    packageName: "adobereader",
                                    displayName: "Acrobat Reader",
                                    summary:
                                        "Acrobat Reader is een computerprogramma van Adobe Systems waarmee pdf-bestanden zijn te lezen.",
                                    rowKey: "2cd4f832-2834-4ddd-aea3-f547d883614d",
                                    category: "aa1ca463-a779-45fe-b1b7-9410521a9a84",
                                    requiresLicense: false,
                                    weight: 43,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/1password-172.png",
                                    packageName: "1password",
                                    displayName: "1Password",
                                    summary:
                                        "1Password is een wachtwoordenapp waarmee je inlogdata en andere geheime informatie veilig opslaat.",
                                    rowKey: "38e6a74d-7e08-428a-9f6f-573e98db0465",
                                    category: "b78e9928-0b61-4c12-8c40-036668ef8241",
                                    requiresLicense: false,
                                    weight: 44,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/docker-172.png",
                                    packageName: "docker-desktop",
                                    displayName: "Docker Desktop",
                                    summary:
                                        "Docker Desktop is de nieuwere technologie die wordt gebruikt voor Docker op Windows. Het vervangt de virtuele Oracle-box door een native virtualisatietechniek die beschikbaar is op Windows, namelijk Microsoft Hyper",
                                    rowKey: "5377b731-fde3-470f-b867-f3cf04f6fc81",
                                    category: "c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d",
                                    requiresLicense: false,
                                    weight: 45,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/visual-studio-code-172.png",
                                    packageName: "vscode.install",
                                    displayName: "Microsoft Visual Studio Code",
                                    summary:
                                        "Visual Studio Code is een broncode-editor ontwikkeld door Microsoft voor Windows, Linux en macOS.",
                                    rowKey: "676f2c26-4f9a-4950-8672-8fdecaa4bbea",
                                    category: "b78e9928-0b61-4c12-8c40-036668ef8241",
                                    requiresLicense: false,
                                    weight: 46,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/winscp-172.png",
                                    packageName: "winscp.install",
                                    displayName: "WinSCP",
                                    summary:
                                        "WinSCP is een grafische opensource-FTP-client voor Windows die gebruikmaakt van het protocol SSH.",
                                    rowKey: "a6a731f4-b4fa-48c0-bc1c-d2574bf5e4ad",
                                    category: "aa1ca463-a779-45fe-b1b7-9410521a9a84",
                                    requiresLicense: false,
                                    weight: 47,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/vlc-172.png",
                                    packageName: "vlc",
                                    displayName: "VLC",
                                    summary:
                                        "VLC media player is een vrije en opensource-mediaspeler, die deel uitmaakt van het VideoLAN-project. De speler ondersteunt een groot aantal audio- en videocodecs en kent ondersteuning voor dvd's,",
                                    rowKey: "a9363fcf-d7ef-4e8b-be3b-a3f13d4e717d",
                                    category: "36c761fa-8735-4184-8ce5-4d17a767d139",
                                    requiresLicense: false,
                                    weight: 48,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/notepadplusplus-172.png",
                                    packageName: "notepadplusplus",
                                    displayName: "Notepad++",
                                    summary: "Notepad++ is een vrije tekst- en broncode-editor voor programmeurs",
                                    rowKey: "d968974f-eb29-4dd7-b43e-f79e0c299b07",
                                    category: "b78e9928-0b61-4c12-8c40-036668ef8241",
                                    requiresLicense: false,
                                    weight: 49,
                                },
                                {
                                    imageUrl:
                                        "https://ilionaprod2001.blob.core.windows.net/app-store-logos/7zip-172.png",
                                    packageName: "7zip.install",
                                    displayName: "7Zip",
                                    summary:
                                        "7-Zip is een computerprogramma om bestanden te archiveren en comprimeren. ",
                                    rowKey: "f1d7c0b5-b854-4e2a-a692-0dc15249f211",
                                    category: "aa1ca463-a779-45fe-b1b7-9410521a9a84",
                                    requiresLicense: false,
                                    weight: 50,
                                },
                            ],
                        })
                    );
                }),
                rest.post(`https://api.iliona.cloud/store-packages/install-package`, function* (req, res, ctx) {
                    yield res(
                        ctx.status(201),
                        ctx.json({ detail: "De applicatie is toegevoegd aan de wachtrij om geinstalleerd te worden" })
                    );
                    return res(
                        ctx.status(422),
                        ctx.json({
                            detail: "De applicatie staat momenteel in de wachtrij om geinstalleerd te worden, een ogenblik geduld alstublieft",
                        })
                    );
                }),
                rest.get(`http://127.0.0.1:10001/subscriptionkey`, (req, res, ctx) => {
                    return res(ctx.json({ subscription_key: "kjfdjkldfjlkfdljkfds" }));
                }),
                rest.get(`http://127.0.0.1:10001/computer`, (req, res, ctx) => {
                    return res(
                        ctx.json({
                            computer_name: "8GGY4Y2_IL",
                        })
                    );
                }),
                rest.get(`http://localhost:10001/localpackages`, (req, res, ctx) => {
                    return res(ctx.json(localPackagesMOCK));
                })
            );

            cy.findByRole("link", {
                name: /adobe acrobat pro/i,
            })
                .should("exist")
                .should("have.attr", "href", `/details/a2898a96-4247-4708-87f4-f3bf44cf351b`)
                .click({ force: true });

            cy.url().should("include", "/details/a2898a96-4247-4708-87f4-f3bf44cf351b");

            cy.findByRole("button", { name: /install/i }).click();

            cy.findByRole("alert", { name: /success\-toast/i }).should("exist");

            cy.findByRole("button", { name: /close alert/i }).click();

            cy.findByRole("alert", { name: /success\-toast/i }).should("not.exist");

            cy.findByRole("button", { name: /install/i }).click();

            cy.findByRole("alert", { name: /warning\-toast/i }).should("exist");
        });
    });
});
