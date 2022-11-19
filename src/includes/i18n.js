import { createI18n } from "vue-i18n";


 const browserLanguageSettings =
 window.navigator.userLanguage || window.navigator.language;

const language = browserLanguageSettings.split(/[-_]/)[0].toLowerCase(); // language without region code

console.log("language:", language);

const checkLanguage = (language) => {
 switch (language) {
   case "en":
     return "en";
   case "ja":
     return "jp";
   default:
     return "en";
 }
};


export default createI18n({
  locale: checkLanguage(language),
});
