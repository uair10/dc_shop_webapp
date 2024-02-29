import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "@/types/product";
import { getProducts } from "@/api";
import type {Category, CategoryWithProducts} from "@/types/category";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as Product[],
    categories: [] as Category[],
    is_loaded: ref(false),
    selectedCategory: ref<Category>(null),
  }),
  getters: {
    allProducts: (state) => {
      return state.products;
    },
    allCategories: (state) => {
      return state.categories;
    },
    categoriesWithProducts: (state) => {
      // Map each category to its associated products
      return state.categories.map((category) => ({
        ...category,
        products: state.products.filter(
          (product) => product.category_id === category.id,
        ),
      })) as CategoryWithProducts[];
    },
    getProductById: (state) => (productId: number) => {
      return (
        state.products.find((product) => product.id === Number(productId)) ||
        null
      );
    },
    selectedCategoryWithProducts: (state) => {
      if (state.selectedCategory) {
        return {
          ...state.selectedCategory,
          products: state.products.filter(
            (product) => product.category_id === state.selectedCategory?.id,
          ),
        };
      }
      return null;
    },
  },
  actions: {
    async fetchProducts(user_tg_id: number) {
      const response = await getProducts(user_tg_id);
      [this.products, this.categories] = response.data;
      this.is_loaded = true;
    },
  },
});
