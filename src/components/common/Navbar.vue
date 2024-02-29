<template>
  <div class="nav-wrap">
    <div ref="navbar" class="nav">
      <img
        src="@/assets/logo.jpg"
        alt="Logo"
        class="logo"
        @click="router.push({ name: 'index' })"
      />
      <categories-list
        v-if="categories && categories.length > 0"
        v-model:selected="selectedCategory"
        :categories="categories"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductStore } from "@/store/product";
import type { Category } from "@/types/category";
import CategoriesList from "@/components/common/CategoriesList.vue";
import router from "@/router";

const productStore = useProductStore();

const { selectedCategory } = storeToRefs(productStore);

const { categories } = defineProps<{ categories?: Array<Category> }>();
</script>

<style scoped>
.nav {
  position: relative;
  width: 100%;
}
.logo {
  margin-right: 10px;
  height: 38px;
  left: 15px;
}
</style>
