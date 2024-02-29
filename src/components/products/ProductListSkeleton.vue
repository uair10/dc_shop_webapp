<template>
  <product-item-skeleton
    v-for="item in [...Array(count)].map(() => generateRandomNumber(2, 5))"
    :lines="item"
  ></product-item-skeleton>
</template>

<script setup lang="ts">
import { generateRandomNumber } from "@/helpers/random";
import ProductItemSkeleton from "@/components/products/ProductItemSkeleton.vue";

const { count } = defineProps<{ count: number }>();
</script>
