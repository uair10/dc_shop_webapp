<template>
  <popup :visible="visible" :on-close="onClose">
    <form class="modal-form" method="POST" @submit.prevent="submitPromoCode">
      <div class="form-group">
        <input
          v-model="promoCode"
          type="text"
          name="code"
          class="form-input"
          required
          @input="(val) => (promoCode = promoCode.toUpperCase())"
        />
      </div>
      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
      <div class="form-group">
        <input type="hidden" name="type" value="add" />
        <button type="submit" class="modal-form-btn">{{ t("submit") }}</button>
      </div>
    </form>
  </popup>
</template>

<script setup lang="ts">
import Popup from "@/components/popups/Popup.vue";
import { ref } from "vue";
import { checkPromoCode } from "@/api";
import { useWebApp } from "vue-tg";
import { useCartStore } from "@/store/cart";
import { useI18n } from "@/composables/useI18n";

const { visible, onClose } = defineProps(["visible", "onClose"]);
const { initDataUnsafe: initData } = useWebApp();
const { t } = useI18n();

const promoCode = ref("");
const errorMessage = ref("");
const cartStore = useCartStore();

const submitPromoCode = async () => {
  try {
    const response = await checkPromoCode(promoCode.value, initData.user.id);
    if (response.success) {
      errorMessage.value = "";
      await cartStore.applyPromoCodeToCart(
        response.promocode_name,
        response.discount_value,
        initData.user.id,
      );
      onClose();
    } else {
      // Display the error message returned from the server
      errorMessage.value = response.message;
    }
  } catch (error) {
    // Handle generic error
    console.error("Error:", error.message);
    onClose();
  }
};
</script>
<style scoped>
.modal-form .form-group {
  margin-bottom: 20px;
}

.modal-form .form-group:last-child {
  margin-bottom: 0;
}

.modal-form .form-input {
  font-size: 14px;
  width: 100%;
  padding: 12px 7px;
  border: none;
  border-bottom: 1px solid #e4e4e4;
  border-radius: 0;
}

.modal-form .form-input::placeholder {
  color: #c6c6c6;
}

.modal-form .form-input:focus {
  outline: none;
}

.modal-form .modal-form-btn {
  font-size: 15px;
  font-weight: 500;
  width: 100%;
  color: #fff;
  background-color: #5e30eb;
  padding: 15px;
  border: none;
  border-radius: 12px;
}

.modal-form .error-text {
  font-size: 14px;
  color: #ff0000;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
