import { IntlShape } from "react-intl";

export const translateRoutePaths = (name: string, intl: IntlShape) => {
    switch (name) {
    case "IntlMultimedia":
        return intl.formatMessage({
            id: "navigation.category.multimedia",
            defaultMessage: "Multimedia"
        });

    case "IntlOverig":
        return intl.formatMessage({
            id: "navigation.category.misc",
            defaultMessage: "Overig"
        });

    case "IntlProductiviteitstools":
        return intl.formatMessage({
            id: "navigation.category.officesoftware",
            defaultMessage: "Bedrijfssoftware"
        });
            
    case "IntlBedrijfssoftware":
        return intl.formatMessage({
            id: "navigation.category.productivityTools",
            defaultMessage: "Productiviteitstools"
        });
            
    case "IntlInternet":
        return intl.formatMessage({
            id: "navigation.category.internet",
            defaultMessage: "Internet"
        });
        
    default:
        return "";
    }
};
