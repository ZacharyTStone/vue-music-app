import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidatePlugin from "./utils/validation";
import { auth } from "./utils/firebase";
import Icon from "./directives/Icon";
import "./assets/tailwind.css";
import "./assets/main.css";
import i18n from "./utils/i18n";
import "./registerServiceWorker";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(i18n);
    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);

    app.directive("Icon", Icon);

    app.mount("#app");
  }
});
