import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/style.css";
import useTheme from "./composables/useTheme";
import VueClickAway from "vue3-click-away";

const { loadTheme } = useTheme();
loadTheme();

const app = createApp(App);

app.use(router).use(VueClickAway).mount("#app");
