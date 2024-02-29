<template>
  <back-button @click="router.back()"></back-button>
  <navbar></navbar>
  <div class="page-title page-title-flex">
    <span>{{ t("cart") }}</span>
    <clear-cart-icon class="cart-empty" @click="clearCart"></clear-cart-icon>
  </div>
  <div class="cart-bg">
    <p v-if="cartStore.items.length === 0" class="cart-bg-text">
      {{ t("cart_is_empty") }}
    </p>
    <cart-item
      v-for="item in cartStore.items"
      v-else
      :key="item.id"
      :item="item"
    ></cart-item>
  </div>
  <div class="cart-promocode-wrapper">
    <label class="use-bonuses-checkbox">
      <input v-model="useBonuses" type="checkbox" /> {{ t("use_bonuses") }}
      <span style="color: #5e30eb">{{ userStore.user.bonuses }}</span>
    </label>
    <button
      v-if="!cartStore.promocode"
      class="cart-promocode-btn"
      @click="togglePromoCodePopup"
    >
      {{ t("enter_promocode") }}
    </button>
    <button
      v-else
      class="cart-promocode-btn cart-promocode-btn-green"
      @click="cartStore.removePromocode(userStore.user.telegram_id)"
    >
      {{ t("delete_promocode") }}
    </button>
  </div>
  <promocode-popup
    :visible="isPromoCodePopupVisible"
    :on-close="closePromoCodePopup"
  />
  <main-button
    :color="'#5E30EB'"
    :text="mainButtonText"
    :visible="cartStore.items.length > 0"
    @click="submitCart"
  ></main-button>
  <cart-total></cart-total>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import CartItem from "@/components/cart/CartItem.vue";
import { sendCart } from "@/api";
import { useCartStore } from "@/store/cart";
import PromocodePopup from "@/components/popups/PromocodePopup.vue";
import router from "@/router";
import ClearCartIcon from "@/components/icons/ClearCartIcon.vue";
import { BackButton, MainButton, useWebApp } from "vue-tg";
import CartTotal from "@/components/cart/CartTotal.vue";
import { useUserStore } from "@/store/user";
import { useI18n } from "@/composables/useI18n";
import Navbar from "@/components/common/Navbar.vue";

const cartStore = useCartStore();
const userStore = useUserStore();
const { initDataUnsafe: initData, close } = useWebApp();
const { t } = useI18n();

const isPromoCodePopupVisible = ref(false);
const useBonuses = computed({
  get: () => cartStore.bonusesAmount > 0,
  set: async (value) => {
    if (value) {
      const bonusDiscount = userStore.user.bonuses;
      await cartStore.applyBonusesToCart(
        bonusDiscount,
        userStore.user.telegram_id,
      );
    } else {
      await cartStore.removeBonusesFromCart(userStore.user.telegram_id);
    }
  },
});

const togglePromoCodePopup = () => {
  isPromoCodePopupVisible.value = true;
};

const closePromoCodePopup = () => {
  isPromoCodePopupVisible.value = false;
};

const submitCart = async () => {
  await sendCart(cartStore.toDict(), userStore.user.telegram_id);
  cartStore.clearCart();
  close();
};

const clearCart = () => {
  cartStore.clearCart();
  router.push({ name: "index" });
};

const mainButtonText = computed(() => t("confirm_order"));

onMounted(async () => {
  await userStore.fetchUser(initData.user.id);
  await cartStore.fetchDiscountedCart(initData.user.id);
});
</script>

<style scoped>
.page-title {
  font-size: 12px;
  font-weight: 400;
  margin: 18px 0 10px;
  padding: 0 25px;
  text-transform: uppercase;
  color: #76757b;
  letter-spacing: 0.015em;
}

.cart-bg {
  background-color: #ffffff;
  border-radius: 13px;
  margin: 0 15px 120px;
  padding: 4px 0px 0px 0px;
  width: calc(100% - 30px);
}

.cart-bg-text {
  text-align: center;
  padding: 20px 10px;
}

.cart-empty {
  width: 21px;
  height: 21px;
  border: none;
}

.cart-promocode-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -109px;
  padding: 0 25px;
}

.use-bonuses-checkbox {
  font-size: 13px;
  color: #76757b;
}

.cart-promocode-btn {
  font-size: 14px;
  color: #76757b;
  background-color: transparent;
  border: none;
  border-bottom: 1px dashed #a4a4a9;
}

.cart-promocode-btn-green {
  color: #5e30eb;
  border-bottom-color: #5e30eb;
}
</style>
