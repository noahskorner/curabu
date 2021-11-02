import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/style.css";
import { loadTheme } from "./composables/useTheme";

loadTheme();

const app = createApp(App);

app.use(router).mount("#app");
