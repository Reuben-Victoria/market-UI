import { createApp } from "vue";
import router from "@/router";
import "./style.css";
import App from "./App2.vue";

const app = createApp(App);

app.use(router);

app.mount("#app");
