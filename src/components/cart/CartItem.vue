<template>
  <div class="cart-item-row">
    <div class="cart-item-thumb">
      <media-renderer
        :source="item.images[0].image_path"
        :alt-text="item.title"
      ></media-renderer>
    </div>
    <div class="cart-item-data">
      <div class="cart-item-label">
        {{ item.title }}
        <div class="cart-item-caption"></div>
        <span v-if="hasDiscount" class="old-price">{{
          formatPrice(itemTotalPrice)
        }}</span>
        <span :class="{ discounted: hasDiscount }">{{
          formatPrice(discounteditemTotalPrice)
        }}</span>
      </div>

      <quantity-controls
        class="cart-item-counter"
        :product="item"
        :max-quantity="item.available_quantity"
      ></quantity-controls>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import type { CartItem } from "@/types/cart";
import QuantityControls from "@/components/products/QuantityControls.vue";
import { useCartStore } from "@/store/cart";
import MediaRenderer from "@/components/common/MediaRenderer.vue";

const { item } = defineProps<{ item: CartItem }>();
const cartStore = useCartStore();

const calculateTotalPrice = (product: CartItem) =>
  product.price * product.quantity;
const calculateDiscountedTotalPrice = (product: CartItem) => {
  return product.discounted_price * product.quantity;
};

const formatPrice = (price: number) => `฿${price.toFixed(2)}`;
const itemTotalPrice = ref(calculateTotalPrice(item));
const discounteditemTotalPrice = ref(calculateDiscountedTotalPrice(item));
const hasDiscount = computed(
  () => discounteditemTotalPrice.value < itemTotalPrice.value,
);

watchEffect(() => {
  const updatedProduct = cartStore.getItem(item.id);
  if (updatedProduct) {
    itemTotalPrice.value = calculateTotalPrice(updatedProduct);
    discounteditemTotalPrice.value =
      calculateDiscountedTotalPrice(updatedProduct);
  }
});
</script>

<style scoped>
.cart-item-thumb {
  margin-right: 12px;
}

.cart-item-thumb img {
  border-radius: 9px;
  width: 45px;
  height: 45px;
  object-fit: cover;
}

.cart-item-data {
  align-items: start;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  padding-bottom: 17px;
  justify-content: space-between;
  position: relative;
  width: calc(100% - 78px);
}

.cart-item-data::after {
  border-bottom: 1px solid #f0f0f0;
  content: "";
  height: 1px;
  position: absolute;
  right: -21px;
  bottom: 0;
  width: calc(100% + 21px);
}

.cart-item-row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 0 13px;
  margin-bottom: 8px;
  margin-top: 9px;
}

.cart-item-row:last-child .cart-item-data::after {
  display: none;
}

.cart-item-label {
  margin-right: 0;
  padding-top: 5px;
  width: calc(100% - 92px);
}

.cart-item-caption {
  color: #9b9b9b;
  font-size: 12px;
  margin-top: 5px;
}

.cart-item-label span {
  display: block;
  margin-top: 4px;
}

.cart-item-counter {
  align-items: center;
  background-color: #f3f2f7;
  border-radius: 9px;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  line-height: 0;
  justify-content: space-between;
  height: 34px;
  margin: 5px -8px 0 0;
  /* overflow: hidden; */
  width: 100px;
}

.cart-item-counter svg {
  width: 10px;
}

.cart-item-counter .cic-minus {
  padding-left: 11px;
}

.cart-item-counter .cic-plus {
  padding-right: 11px;
}

.cart-item-error {
  position: relative;
}

.cart-item-error .cic-count {
  color: #f1222e;
}

.cart-item-error .cic-minus svg rect {
  fill: #f1222e;
}

.cart-item-tooltip {
  display: none;
  font-weight: 500;
  line-height: 20px;
  color: #fff;
  white-space: nowrap;
  height: 22px;
  background-color: #f1222e;
  padding: 0 10px;
  border-radius: 5px;
  position: absolute;
  top: 30px;
  right: 30px;
}

.cart-item-tooltip::after {
  display: block;
  content: "";
  background-color: #f1222e;
  width: 5px;
  height: 5px;
  position: absolute;
  top: -2px;
  right: 12px;
  transform: rotate(45deg);
}

.cart-item-error .cart-item-tooltip {
  display: block;
}

.ci-image-container .splide__slide {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.old-price {
  margin-right: 5px;
  color: #888;
  text-decoration: line-through;
}
</style>
