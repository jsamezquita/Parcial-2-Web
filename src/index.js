import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import SeriesList from "./seriesList";
import reportWebVitals from './reportWebVitals';
import localeEsMessages from "./locales/es"
import localeEnMessages from "./locales/en"
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

function getBrowserLang(){
  return navigator.language || navigator.userLanguage
}

function getLocale(){
  const lang = getBrowserLang().slice(0,2);
  if(lang==="en"){
    return localeEnMessages;
  }
  else{
    return localeEsMessages;
  }
}
ReactDOM.render(
  <IntlProvider locale={getBrowserLang()} messages={getLocale()}>
    <SeriesList/>
  </IntlProvider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log)) 
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
