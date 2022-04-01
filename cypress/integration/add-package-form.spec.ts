import { should } from "chai";
import { verify } from "crypto";
import { exists } from "fs";
import { rest } from "msw";
import { localPackagesMOCK } from "../../src/mocks/mockData";

describe("Fackage form", () => {
    beforeEach(() => {
        cy.visit("/packages/add");
    });

    it("test the flow of adding a new package", () => {
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

            const image = "postman_logo.jpg";

            cy.findByLabelText(/display name/i)
                .should("have.focus")
                .blur();

            cy.findByRole("alert", {
                name: /display name/i,
            }).should("exist");

            cy.findByPlaceholderText(/display name of the package/i)
                .type("Docker")
                .blur();

            cy.findByRole("alert", {
                name: /display name/i,
            }).should("not.exist");

            cy.findByLabelText(/category/i).select("Multimedia");

            cy.findByRole("radio", {
                name: /yes/i,
            }).check();

            cy.findByTestId("image-upload-button").attachFile(`images/${image}`);

            cy.findByText(image).should("exist");
        });
    });
});
