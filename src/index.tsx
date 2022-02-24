import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; 
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/default.scss";
import { IntlProvider } from "react-intl";
import { translationSets } from "./i18n/translations";

ReactDOM.render(

    <IntlProvider locale={'nl'} messages={translationSets['en']}>
        <Provider store={ store }>
            <App />
        </Provider>
    </IntlProvider>
    ,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
