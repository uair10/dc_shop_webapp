<template>
  <back-button @click="router.back()"></back-button>
  <product-details-skeleton v-if="!product"></product-details-skeleton>
  <product-details v-else :product="product"></product-details>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useProductStore } from "@/store/product";
import { BackButton, useWebApp, useWebAppViewport } from "vue-tg";
import router from "@/router";
import { useRoute } from "vue-router";
import ProductDetailsSkeleton from "@/components/products/ProductDetailsSkeleton.vue";
import ProductDetails from "@/components/products/ProductDetails.vue";

const productStore = useProductStore();
const { initDataUnsafe: initData } = useWebApp();

const { expand } = useWebAppViewport();

const route = useRoute();
const currentProductId = route.params.id as string;
const product = ref(null);

onMounted(async () => {
  expand();
  await productStore.fetchProducts(initData.user.id);
  product.value = productStore.getProductById(Number(currentProductId));
});
</script>
