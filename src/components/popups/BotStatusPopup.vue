<template>
  <popup :visible="popupIsVisible" :on-close="closePopup">
    <div class="popup-message">
      {{ popupMessage }}
    </div>
  </popup>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchBotSettings } from "@/api";
import Popup from "@/components/popups/Popup.vue";
import { useI18n } from "@/composables/useI18n";

const { t } = useI18n();
const popupIsVisible = ref(false);
const popupMessage = ref("");

const closePopup = () => {
  popupIsVisible.value = false;
  sessionStorage.setItem("botStatusPopupShown", "true");
};

onMounted(async () => {
  const botStatusPopupShown = sessionStorage.getItem("botStatusPopupShown");

  if (!botStatusPopupShown) {
    const botSettings = await fetchBotSettings();
    if (!botSettings.is_bot_enabled) {
      if (!botSettings.bot_disabled_until) {
        popupMessage.value = t("bot_is_disabled");
      } else {
        popupMessage.value = t("delivery_is_unavailable");
      }
      popupIsVisible.value = true;
    }
  }
});
</script>

<style scoped>
.popup-message {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 30px;
}
</style>
