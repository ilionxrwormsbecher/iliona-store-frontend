

export const reduxCategoriesFilled =   {
    initialState: {
        categorySlice: {
            errorMessage: '',
            categories: [
                {
                    PartitionKey: 'Category',
                    RowKey: '36c761fa-8735-4184-8ce5-4d17a767d139',
                    IsCustom: 'False',
                    Name: 'IntlMultimedia',
                    RouteFriendlyName: 'Multimedia'
                },
                {
                    PartitionKey: 'Category',
                    RowKey: '588ba4ae-5996-4380-9390-fc7e1ff49bf5',
                    Name: 'IntlOverig',
                    RouteFriendlyName: 'Overig'
                },
                {
                    PartitionKey: 'Category',
                    RowKey: 'aa1ca463-a779-45fe-b1b7-9410521a9a84',
                    IsCustom: 'False',
                    Name: 'IntlProductiviteitstools',
                    RouteFriendlyName: 'Productiviteitstools'
                },
                {
                    PartitionKey: 'Category',
                    RowKey: 'b78e9928-0b61-4c12-8c40-036668ef8241',
                    IsCustom: 'False',
                    Name: 'IntlBedrijfssoftware',
                    RouteFriendlyName: 'Bedrijfssoftware'
                },
                {
                    PartitionKey: 'Category',
                    RowKey: 'c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d',
                    IsCustom: 'False',
                    Name: 'IntlInternet',
                    RouteFriendlyName: 'Internet'
                }
            ],
            isFetching: false
        }
    }
}

export const reduxFullStoreWithoutPackages = {
    initialState: {
        packagesSlice: {
        errorMessage: '',
        ilionaPackages: [],
        selectedPackageDetail: [],
        isFetching: false,
        packageInstallFailed: false,
        packageInstallSuccessful: false
        },
        categorySlice: {
        errorMessage: '',
        categories: [
            {
            PartitionKey: 'Category',
            RowKey: '36c761fa-8735-4184-8ce5-4d17a767d139',
            IsCustom: 'False',
            Name: 'IntlMultimedia',
            RouteFriendlyName: 'Multimedia'
            },
            {
            PartitionKey: 'Category',
            RowKey: '588ba4ae-5996-4380-9390-fc7e1ff49bf5',
            Name: 'IntlOverig',
            RouteFriendlyName: 'Overig'
            },
            {
            PartitionKey: 'Category',
            RowKey: 'aa1ca463-a779-45fe-b1b7-9410521a9a84',
            IsCustom: 'False',
            Name: 'IntlProductiviteitstools',
            RouteFriendlyName: 'Productiviteitstools'
            },
            {
            PartitionKey: 'Category',
            RowKey: 'b78e9928-0b61-4c12-8c40-036668ef8241',
            IsCustom: 'False',
            Name: 'IntlBedrijfssoftware',
            RouteFriendlyName: 'Bedrijfssoftware'
            },
            {
            PartitionKey: 'Category',
            RowKey: 'c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d',
            IsCustom: 'False',
            Name: 'IntlInternet',
            RouteFriendlyName: 'Internet'
            }
        ],
        isFetching: false
        },
        router: {
        location: {
            pathname: '/',
            search: '',
            hash: '',
            state: null,
            key: 'default'
        },
        action: 'POP'
        }
    }
}



export const reduxPackagesLoading = {
    initialState: {
        packagesSlice: {
            errorMessage: '',
            ilionaPackages: [],
            selectedPackageDetail: [],
            isFetching: true,
            packageInstallFailed: false,
            packageInstallSuccessful: false
        },
        categorySlice: {
            errorMessage: '',
            categories: [
            {
                PartitionKey: 'Category',
                RowKey: '36c761fa-8735-4184-8ce5-4d17a767d139',
                IsCustom: 'False',
                Name: 'IntlMultimedia',
                RouteFriendlyName: 'Multimedia'
            },
            {
                PartitionKey: 'Category',
                RowKey: '588ba4ae-5996-4380-9390-fc7e1ff49bf5',
                Name: 'IntlOverig',
                RouteFriendlyName: 'Overig'
            },
            {
                PartitionKey: 'Category',
                RowKey: 'aa1ca463-a779-45fe-b1b7-9410521a9a84',
                IsCustom: 'False',
                Name: 'IntlProductiviteitstools',
                RouteFriendlyName: 'Productiviteitstools'
            },
            {
                PartitionKey: 'Category',
                RowKey: 'b78e9928-0b61-4c12-8c40-036668ef8241',
                IsCustom: 'False',
                Name: 'IntlBedrijfssoftware',
                RouteFriendlyName: 'Bedrijfssoftware'
            },
            {
                PartitionKey: 'Category',
                RowKey: 'c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d',
                IsCustom: 'False',
                Name: 'IntlInternet',
                RouteFriendlyName: 'Internet'
            }
            ],
            isFetching: false
        },
        router: {
            location: {
            pathname: '/',
            search: '',
            hash: '',
            state: null,
            key: 'ealekzrj'
            },
            action: 'PUSH'
        }
    }
}

export const reduxPackagesErrormessage = {
    initialState: {
        packagesSlice: {
            errorMessage: 'Something has gone wrong',
            ilionaPackages: [],
            selectedPackageDetail: [],
            isFetching: false,
            packageInstallFailed: false,
            packageInstallSuccessful: false
        },
        categorySlice: {
            errorMessage: '',
            categories: [
            {
                PartitionKey: 'Category',
                RowKey: '36c761fa-8735-4184-8ce5-4d17a767d139',
                IsCustom: 'False',
                Name: 'IntlMultimedia',
                RouteFriendlyName: 'Multimedia'
            },
            {
                PartitionKey: 'Category',
                RowKey: '588ba4ae-5996-4380-9390-fc7e1ff49bf5',
                Name: 'IntlOverig',
                RouteFriendlyName: 'Overig'
            },
            {
                PartitionKey: 'Category',
                RowKey: 'aa1ca463-a779-45fe-b1b7-9410521a9a84',
                IsCustom: 'False',
                Name: 'IntlProductiviteitstools',
                RouteFriendlyName: 'Productiviteitstools'
            },
            {
                PartitionKey: 'Category',
                RowKey: 'b78e9928-0b61-4c12-8c40-036668ef8241',
                IsCustom: 'False',
                Name: 'IntlBedrijfssoftware',
                RouteFriendlyName: 'Bedrijfssoftware'
            },
            {
                PartitionKey: 'Category',
                RowKey: 'c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d',
                IsCustom: 'False',
                Name: 'IntlInternet',
                RouteFriendlyName: 'Internet'
            }
            ],
            isFetching: false
        },
        router: {
            location: {
            pathname: '/',
            search: '',
            hash: '',
            state: null,
            key: 'ealekzrj'
            },
            action: 'PUSH'
        }
    }
}





export const reduxNoPackagesAndCategories = {
    initialState: {
        packagesSlice: {
            errorMessage: '',
            ilionaPackages: [
                {
                    imageUrl: 'https://ilionaprod2001.blob.core.windows.net/app-store-logos/dockerLogoResized.png',
                    packageName: 'Docker Desktop',
                    displayName: 'Docker Desktop',
                    summary: 'Let\'s you run containerized apps',
                    rowKey: '22afc55f-b02c-434b-8441-da96023094b7',
                    category: 'aa1ca463-a779-45fe-b1b7-9410521a9a84',
                    requiresLicense: false
                },
            ],
            selectedPackageDetail: [],
            isFetching: false,
            packageInstallFailed: false,
            packageInstallSuccessful: false
        },
        categorySlice: {
            errorMessage: '',
            categories: [],
            isFetching: false
        },
        router: {
            location: {
            pathname: '/',
            search: '',
            hash: '',
            state: null,
            key: 'ealekzrj'
            },
            action: 'PUSH'
        }
    }
}



export const reduxFullStoreWithPackagesAndCategories = {
    initialState: {
        packagesSlice: {
            errorMessage: '',
            ilionaPackages: [
              {
                imageUrl: 'https://ilionaprod2001.blob.core.windows.net/app-store-logos/dockerLogoResized.png',
                packageName: 'Docker Desktop',
                displayName: 'Docker Desktop',
                summary: 'Let\'s you run containerized apps',
                rowKey: '22afc55f-b02c-434b-8441-da96023094b7',
                category: 'aa1ca463-a779-45fe-b1b7-9410521a9a84',
                requiresLicense: false
              },
              {
                imageUrl: 'https://ilionaprod2001.blob.core.windows.net/app-store-logos/postman.jpg',
                packageName: 'Postman',
                displayName: 'Postman',
                summary: 'Postman is an API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs\ufffdfaster.',
                rowKey: '3a3d8d83-2677-4053-8bf6-debaa2e8f753',
                category: 'c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d',
                requiresLicense: false
              },
              {
                imageUrl: 'https://ilionaprod2001.blob.core.windows.net/app-store-logos/norton.png',
                packageName: 'Norton anti virus',
                displayName: 'Norton anti virus',
                summary: 'Wij leggen de lat hoog voor beveiliging. Norton wordt keer op keer erkend door gerenommeerde testlaboratoria.\nGeen enkel ander consumentenmerk werd zo vaak bekroond door PC Magazine als Norton.',
                rowKey: '439b61d3-b6e4-482d-b112-bc3da9081fd1',
                category: 'b78e9928-0b61-4c12-8c40-036668ef8241',
                requiresLicense: true
              },
              {
                imageUrl: 'https://ilionaprod2001.blob.core.windows.net/app-store-logos/office365LogoResized.png',
                packageName: 'Microsoft Office 365',
                displayName: 'Microsoft Office 365',
                summary: 'Microsoft 365 is een suite met apps die je helpen verbonden te blijven en dingen gedaan te krijgen',
                rowKey: '4f482b00-c7b9-4b38-818b-e11c3d60a012',
                category: 'b78e9928-0b61-4c12-8c40-036668ef8241',
                requiresLicense: true
              },
              {
                imageUrl: 'https://ilionaprod2001.blob.core.windows.net/app-store-logos/vs-code.png',
                packageName: 'Visual Studio Code',
                displayName: 'Visual Studio Code',
                summary: 'Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js',
                rowKey: 'a93bcc6e-6ae1-4dcb-92d5-fbc902d189bc',
                category: 'aa1ca463-a779-45fe-b1b7-9410521a9a84',
                requiresLicense: false
              },
              {
                imageUrl: 'https://ilionaprod2001.blob.core.windows.net/app-store-logos/google-earth.png',
                packageName: 'Google earth',
                displayName: 'Google earth',
                summary: 'Verken satellietbeelden, 3D-gebouwen en 3D-terrein van honderden steden overal ter wereld. Zoom in op je huis of een andere plek en gebruik vervolgens Street View voor een 360\ufffd-perspectief.',
                rowKey: 'b291d941-3031-416d-b7f3-5e7417f0b336',
                category: '588ba4ae-5996-4380-9390-fc7e1ff49bf5',
                requiresLicense: false
              },
              {
                imageUrl: 'https://ilionaprod2001.blob.core.windows.net/app-store-logos/ae.png',
                packageName: 'After effects',
                displayName: 'After effects',
                summary: 'Create cinematic movie titles, intros, and transitions. Remove an object from a clip. Create a scene with fire or rainfall. Make a logo or character move. You can even navigate and design in a 3D space. With After Effects, the leading software for motion graphics and visual effects, you can bring any idea to life.',
                rowKey: 'be9d59a5-5137-4600-b36c-dc9769d25e3b',
                category: '36c761fa-8735-4184-8ce5-4d17a767d139',
                requiresLicense: true
              },
              {
                imageUrl: 'https://ilionaprod2001.blob.core.windows.net/app-store-logos/photoshoplogo.jpg',
                packageName: 'Photoshop',
                displayName: 'Photoshop',
                summary: 'Begin met Photoshop. En laat je betoveren. Prachtige afbeeldingen, gedetailleerde illustraties en ongelofelijke kunst \ufffd je maakt het allemaal met Photoshop. ',
                rowKey: 'f75743f1-c779-4305-b2c7-b083bd8dd32e',
                category: '36c761fa-8735-4184-8ce5-4d17a767d139',
                requiresLicense: true
              }
            ],
            selectedPackageDetail: [
              {
                PartitionKey: 'app',
                RowKey: 'be9d59a5-5137-4600-b36c-dc9769d25e3b',
                Category: '36c761fa-8735-4184-8ce5-4d17a767d139',
                Dependencies: 'Geen',
                Description: 'Create cinematic movie titles, intros, and transitions. Remove an object from a clip. Create a scene with fire or rainfall. Make a logo or character move. You can even navigate and design in a 3D space. With After Effects, the leading software for motion graphics and visual effects, you can bring any idea to life.',
                DisplayName: 'After effects',
                ImageUrl: 'https://ilionaprod2001.blob.core.windows.net/app-store-logos/ae.png',
                InstallationTime: 30,
                IsAlreadyInstalled: false,
                IsVisible: true,
                LicenseMessage: 'Let op voor After effetcs heeft u een licentie nodig.',
                NeedToRestart: false,
                PackageName: 'After effects',
                PublishDate: '2020-12-11T16:11:29.3221949Z',
                RequiresLicense: true,
                Summary: 'Create cinematic movie titles, intros, and transitions. Remove an object from a clip. Create a scene with fire or rainfall. Make a logo or character move. You can even navigate and design in a 3D space. With After Effects, the leading software for motion graphics and visual effects, you can bring any idea to life.',
                Tags: 'Grafisch',
                Weight: 7
              }
            ],
            isFetching: false,
            packageInstallFailed: false,
            packageInstallSuccessful: false
          },
          categorySlice: {
            errorMessage: '',
            categories: [
              {
                PartitionKey: 'Category',
                RowKey: '36c761fa-8735-4184-8ce5-4d17a767d139',
                IsCustom: 'False',
                Name: 'IntlMultimedia',
                RouteFriendlyName: 'Multimedia'
              },
              {
                PartitionKey: 'Category',
                RowKey: '588ba4ae-5996-4380-9390-fc7e1ff49bf5',
                Name: 'IntlOverig',
                RouteFriendlyName: 'Overig'
              },
              {
                PartitionKey: 'Category',
                RowKey: 'aa1ca463-a779-45fe-b1b7-9410521a9a84',
                IsCustom: 'False',
                Name: 'IntlProductiviteitstools',
                RouteFriendlyName: 'Productiviteitstools'
              },
              {
                PartitionKey: 'Category',
                RowKey: 'b78e9928-0b61-4c12-8c40-036668ef8241',
                IsCustom: 'False',
                Name: 'IntlBedrijfssoftware',
                RouteFriendlyName: 'Bedrijfssoftware'
              },
              {
                PartitionKey: 'Category',
                RowKey: 'c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d',
                IsCustom: 'False',
                Name: 'IntlInternet',
                RouteFriendlyName: 'Internet'
              }
            ],
            isFetching: false
          },
          router: {
            location: {
              pathname: '/categorie/productiviteitstools',
              search: '',
              hash: '',
              state: null,
              key: 'c79skqlb'
            },
            action: 'PUSH'
          }
    }
}
