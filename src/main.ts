import "./assets/main.css";
import { createApp, onBeforeMount } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useI18n } from "@/composables/useI18n";

const app = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
  onBeforeMount(() => {
    if ("init" in store) {
      store.init();
    }
  });
});

const { initI18n } = useI18n();
initI18n("en");

app.use(router);
app.use(pinia);
app.mount("#app");
