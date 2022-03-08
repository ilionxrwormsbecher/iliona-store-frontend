import { IntlShape } from "react-intl";

export const translateRoutePaths = (name: string, intl: IntlShape) => {
    switch (name) {
        case "IntlMultimedia":
        case "36c761fa-8735-4184-8ce5-4d17a767d139":
        case "multimedia":
            return intl.formatMessage({
                id: "navigation.category.multimedia",
                defaultMessage: "Multimedia",
            });

        case "IntlOverig":
        case "36c761fa-8735-4184-8ce5-4d17a767d139":
        case "overig":
            return intl.formatMessage({
                id: "navigation.category.misc",
                defaultMessage: "Overig",
            });

        case "IntlBedrijfssoftware":
        case "b78e9928-0b61-4c12-8c40-036668ef8241":
        case "bedrijfssoftware":
            return intl.formatMessage({
                id: "navigation.category.officesoftware",
                defaultMessage: "Bedrijfssoftware",
            });

        case "IntlProductiviteitstools":
        case "aa1ca463-a779-45fe-b1b7-9410521a9a84":
        case "productiviteitstools":
            return intl.formatMessage({
                id: "navigation.category.productivityTools",
                defaultMessage: "Productiviteitstools",
            });

        case "IntlInternet":
        case "c0c9d05b-4124-4fa8-9a8f-3a7214b2c65d":
        case "internet":
            return intl.formatMessage({
                id: "navigation.category.internet",
                defaultMessage: "Internet",
            });

        default:
            return "";
    }
};
