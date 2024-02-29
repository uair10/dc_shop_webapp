import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ProductList from "@/views/ProductList.vue";
import Cart from "@/views/Cart.vue";
import ProductDetailsPage from "@/views/ProductDetailsPage.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "index", component: ProductList },
  { path: "/cart/", name: "cart", component: Cart },
  {
    path: "/products/:id",
    name: "product-details",
    component: ProductDetailsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
