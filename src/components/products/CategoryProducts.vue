<template>
  <div class="catalog-item-wrap">
    <div class="catalog-item-title">{{ category.title }}</div>
    <product-item
      v-for="product in category.products"
      :key="product.id"
      :product="product"
    ></product-item>
  </div>
</template>

<script setup lang="ts">
import ProductItem from "@/components/products/ProductItem.vue";
import type { CategoryWithProducts } from "@/types/category";

const { category } = defineProps<{
  category: CategoryWithProducts;
}>();
</script>
