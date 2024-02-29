<template>
  <div>
    <navbar :categories="categoriesWithProducts"></navbar>
    <div class="catalog-container">
      <div v-if="!is_loaded" class="catalog-item-title"></div>
      <div v-if="!is_loaded" class="catalog-item-wrap">
        <product-list-skeleton :count="16" />
      </div>
      <all-products
        v-if="is_loaded && !selectedCategoryWithProducts"
        key="product-list"
        :categories_with_products="categoriesWithProducts"
      />
      <category-products
        v-if="is_loaded && selectedCategoryWithProducts"
        :category="selectedCategoryWithProducts"
        :selected-category="selectedCategory"
      ></category-products>
    </div>
    <cart-total></cart-total>
    <main-button
      :color="'#5E30EB'"
      :text="mainButtonText"
      :visible="cartStore.items.length > 0"
      @click="router.push({ name: 'cart' })"
    ></main-button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { MainButton, useWebApp } from "vue-tg";
import { computed, onMounted } from "vue";
import { useProductStore } from "@/store/product";
import ProductListSkeleton from "@/components/products/ProductListSkeleton.vue";
import AllProducts from "@/components/products/AllProducts.vue";
import CategoryProducts from "@/components/products/CategoryProducts.vue";
import CartTotal from "@/components/cart/CartTotal.vue";
import Navbar from "@/components/common/Navbar.vue";
import { useCartStore } from "@/store/cart";
import router from "@/router";
import { useI18n } from "@/composables/useI18n";

const productStore = useProductStore();
const cartStore = useCartStore();
const { initDataUnsafe: initData } = useWebApp();
const { t } = useI18n();

const {
  selectedCategoryWithProducts,
  selectedCategory,
  categoriesWithProducts,
  is_loaded,
} = storeToRefs(productStore);

const mainButtonText = computed(() => t("go_to_cart"));

onMounted(async () => {
  await productStore.fetchProducts(initData.user.id);
});
</script>
