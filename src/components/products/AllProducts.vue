<template>
  <div
    v-for="category in categories_with_products"
    :key="category.id"
    class="catalog-item-wrap"
    data-target-block=""
  >
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

const { categories_with_products } = defineProps<{
  categories_with_products: CategoryWithProducts[];
}>();
</script>
