<template>
  <div class="wrap">
    <div class="page-wrapper">
      <router-view />
      <bot-status-popup></bot-status-popup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { RouterView } from "vue-router";
import { useWebApp, useWebAppTheme, useWebAppPopup } from "vue-tg";
import BotStatusPopup from "@/components/popups/BotStatusPopup.vue";
import { useUserStore } from "@/store/user";
import { useI18n } from "@/composables/useI18n";

const {
  initDataUnsafe: initData,
  close,
  isVersionAtLeast,
  ready,
} = useWebApp();
const { showAlert } = useWebAppPopup();
const { colorScheme } = useWebAppTheme();
const userStore = useUserStore();
const { setLocale } = useI18n();

if (typeof initData.user?.id !== "number") {
  showAlert("Error: initData is missing", close);
}

if (!isVersionAtLeast("6.9")) {
  showAlert("Cloud Storage is not supported.\nPlease update your app.", close);
}

watch(
  colorScheme,
  (scheme) => {
    document.documentElement.setAttribute("data-theme", scheme);
    scheme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  },
  {
    immediate: true,
  },
);

onMounted(async () => {
  await userStore.fetchUser(initData.user.id);
  await setLocale(userStore.user.lang_code);
  ready();
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

body {
  background-size: 100% auto;
  font-family: "Inter", sans-serif;
  font-weight: normal;
  line-height: 1.2;
  min-width: 360px;
  overflow-x: hidden;
  background-color: #efeef4;
}

a {
  font-family: "Inter", sans-serif;
  font-weight: normal;
  text-decoration: none;
}

ul {
  list-style: none;
}
</style>
