import { createApp } from "vue";
import VueClickAway from "vue3-click-away";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/style.css";
// Global Components
import Logo from "./components/ui/Logo.vue";
import IconButton from "./components/ui/IconButton.vue";
const app = createApp(App);
app.component("Logo", Logo);
app.component("IconButton", IconButton);

app.use(store).use(router).use(VueClickAway).mount("#app");
