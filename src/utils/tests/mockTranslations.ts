import { createIntl } from "react-intl";
import dutchMessages from "../../i18n/translations/nl"
import englishMessages from "../../i18n/translations/en"

export const intlDutch = createIntl({
    locale: 'nl',
    messages: {
        ...dutchMessages
    }
});


export const intlEnglish = createIntl({
    locale: 'en',
    messages: {
        ...englishMessages
    }
})

export const intlChinese = createIntl({
    locale: 'zh',
    messages: {}
})