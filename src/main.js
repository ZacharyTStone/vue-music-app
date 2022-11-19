import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidatePlugin from "./includes/validation";
import { auth } from "./includes/firebase";
import Icon from "./directives/Icon";
import "./assets/tailwind.css";
import "./assets/main.css";
import i18n from "./includes/i18n";
import "./registerServiceWorker";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);

    app.directive("Icon", Icon);

    app.mount("#app")
    app.use(i18n);
  }
});
