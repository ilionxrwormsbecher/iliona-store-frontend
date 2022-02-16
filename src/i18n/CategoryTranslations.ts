import { IntlShape } from "react-intl";

export const translateRoutePaths = (name: string, intl: IntlShape) => {
    switch (name) {
    case "IntlMultimedia":
    case "multimedia": 
        return intl.formatMessage({
            id: "navigation.category.multimedia",
            defaultMessage: "Multimedia"
        });

    case "IntlOverig":
    case "overig":
        return intl.formatMessage({
            id: "navigation.category.misc",
            defaultMessage: "Overig"
        });

    case "IntlBedrijfssoftware":
    case "bedrijfssoftware":
        return intl.formatMessage({
            id: "navigation.category.officesoftware",
            defaultMessage: "Bedrijfssoftware"
        });
            
    case "IntlProductiviteitstools":
    case "productiviteitstools":
        return intl.formatMessage({
            id: "navigation.category.productivityTools",
            defaultMessage: "Productiviteitstools"
        });
            
    case "IntlInternet":
    case "internet":
        return intl.formatMessage({
            id: "navigation.category.internet",
            defaultMessage: "Internet"
        });
        
    default:
        return "";
    }
};
