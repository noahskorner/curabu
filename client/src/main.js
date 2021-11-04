import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/style.css";
import { loadTheme } from "./composables/useTheme";
import VueClickAway from "vue3-click-away";

loadTheme();

const app = createApp(App);

app.use(router).use(VueClickAway).mount("#app");
