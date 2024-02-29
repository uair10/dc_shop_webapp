<template>
  <div v-if="currentCount === 0" class="ci-price touch-item" @click="addToCart">
    ฿ {{ product.price }}
  </div>
  <div v-else class="ci-counter-wrap">
    <div
      class="cic-minus touch-item"
      :class="{ disabled: currentCount === 0 }"
      @click="decreaseQuantity"
    >
      <icon-minus></icon-minus>
    </div>
    <div class="cic-count">{{ currentCount }}</div>
    <div
      class="cic-plus touch-item"
      :class="{ disabled: currentCount >= product.available_quantity }"
      @click="increaseQuantity"
    >
      <icon-plus></icon-plus>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart";
import { useWebApp } from "vue-tg";
import { computed, watch } from "vue";
import type { Product } from "@/types/product";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconMinus from "@/components/icons/IconMinus.vue";
import type { CartItem } from "@/types/cart";

const { product } = defineProps<{ product: CartItem | Product }>();
const emit = defineEmits<{
  (eventName: "quantityChanged", quantity: number): void;
}>();

const cartStore = useCartStore();
const { initDataUnsafe: initData } = useWebApp();

const currentCount = computed(() => {
  const cartItem = cartStore.getItem(product.id);
  return cartItem ? cartItem.quantity : 0;
});

const decreaseQuantity = async () => {
  if (currentCount.value > 0) {
    await cartStore.decreaseItemQuantity(initData.user.id, product.id);
  }
};

const increaseQuantity = async () => {
  if (currentCount.value < product.available_quantity) {
    await cartStore.increaseItemQuantity(initData.user.id, product.id);
  }
};

const addToCart = async () => {
  const item = {
    id: product.id,
    title: product.title,
    price: product.price,
    category_id: product.category_id,
    quantity: 1,
  };
  await cartStore.addItem(initData.user.id, item, 1);
};

watch(currentCount, () => {
  emit("quantityChanged", currentCount.value);
});
</script>

<style scoped>
.ci-counter-wrap {
  align-items: center;
  background-color: #f6f5fa;
  border-radius: 12px;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  line-height: 1.2;
  height: 34px;
  justify-content: space-between;
  overflow: hidden;
}

.ci-counter-wrap svg {
  width: 12px;
}

.cic-minus,
.cic-plus {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 40px;
}

.cic-minus {
  box-shadow: inset 55px 0 20px -22px rgba(0, 0, 0, 0);
  padding-left: 13px;
}

.cic-minus.touched {
  box-shadow: inset 40px 0 15px -20px #e3e3e39c;
  outline: none;
}

.cic-plus {
  box-shadow: inset -55px 0 20px -22px rgba(0, 0, 0, 0);
  justify-content: flex-end;
  padding-right: 13px;
}

.cic-plus.touched {
  box-shadow: inset -40px 0 15px -20px #e3e3e39c;
  outline: none;
}

.cic-count {
  font-weight: 500;
}

.ci-price {
  align-items: center;
  background-color: #f3f2f7;
  border-radius: 11px;
  display: flex;
  cursor: pointer;
  flex-wrap: wrap;
  font-size: 13px;
  line-height: 0;
  justify-content: center;
  height: 34px;
}
</style>
