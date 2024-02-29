<template>
  <category-button
    :category="{ title: 'All' }"
    :selected="!selectedModel"
    @click="selectedModel = undefined"
  />
  <category-button
    v-for="category in categories"
    :key="category.title"
    :category="category"
    :selected="category.title === selectedModel?.title"
    @click="handleCategoryClick(category)"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useWheelHorizontalScroll } from "@/composables/useWheelHorizontalScroll";
import type { Category } from "@/types/category";
import CategoryButton from "@/components/common/CategoryButton.vue";

const selectedModel = defineModel<Category>("selected");

defineProps<{
  categories: Category[];
}>();

const container = ref<HTMLElement | null>(null);

function handleCategoryClick(category: Category) {
  selectedModel.value =
    selectedModel.value?.title !== category.title ? category : undefined;
}

useWheelHorizontalScroll(container);
</script>
