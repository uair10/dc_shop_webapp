<template>
  <div
    :class="{
      active: selected,
      '': !selected,
    }"
  >
    <span>{{ category.title }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Category } from "@/types/category";

defineProps<{
  category: Category;
  selected?: boolean;
}>();
</script>
