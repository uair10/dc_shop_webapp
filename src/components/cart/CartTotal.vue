<template>
  <div v-show="cartStore.totalAmount > 0" class="go-to-order-wrap">
    ฿ {{ cartStore.totalAmount }}
  </div>
  <main-button v-show="cartStore.totalAmount > 0" :color="'#5E30EB'"
    >Go to cart</main-button
  >
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart";
import { MainButton } from "vue-tg";

const cartStore = useCartStore();
</script>

<style scoped></style>
