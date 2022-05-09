import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/default.scss";
import { IntlProvider } from "react-intl";
import { translationSets } from "./i18n/translations";

if (process.env.NODE_ENV === "development" && process.env.REACT_APP_USE_MSW) {
    const { worker } = require("./mocks/browser");
    worker.start();
}

console.log("this is master", process.env.REACT_APP_API_URL);

ReactDOM.render(
    <IntlProvider locale={"nl"} messages={translationSets["nl"]}>
        <Provider store={store}>
            <App />
        </Provider>
    </IntlProvider>,
    document.getElementById("root")
);
