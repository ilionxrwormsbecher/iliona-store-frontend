import { ggdTheme } from "./ggdTheme";
import { ilionxTheme } from "./ilionx";

export function themeSelector(themeName: string) {

    switch (themeName) {
    case "ilionx":
        return ilionxTheme;

    case "ggd":
        return ggdTheme;

    default:
        return ilionxTheme;
    }
}
