<template>
  <div class="catalog-item">
    <div class="catalog-item-product">
      <splide
        v-if="imagePaths.length > 1"
        :options="{ rewind: true, pagination: false }"
      >
        <splide-slide v-for="image in imagePaths" :key="image">
          <div class="ci-thumb">
            <div class="ci-image-container">
              <media-renderer
                :source="image"
                :alt-text="product.title"
                :on-click="() => navigateToProductDetails(product.id)"
              ></media-renderer>
            </div>
          </div>
        </splide-slide>
      </splide>
      <div v-else class="ci-thumb">
        <div class="ci-image-container">
          <media-renderer
            :source="imagePaths[0]"
            :alt-text="product.title"
            :on-click="() => navigateToProductDetails(product.id)"
          ></media-renderer>
        </div>
      </div>
      <div
        class="ci-name"
        style="font-size: 14px"
        @click="navigateToProductDetails(product.id)"
      >
        {{ product.title }}
      </div>
      <div v-if="product.description" class="ci-weight" style="font-size: 13px">
        {{ product.description }}
      </div>
    </div>
    <quantity-controls
      class="ci-price-counter"
      :product="product"
      :quantity="quantity"
      :max-quantity="product.available_quantity"
    ></quantity-controls>
  </div>
</template>

<script setup lang="ts">
import "@splidejs/vue-splide/css";
import { Splide, SplideSlide } from "@splidejs/vue-splide";

import { ref } from "vue";
import QuantityControls from "@/components/products/QuantityControls.vue";
import type { Product } from "@/types/product";
import router from "@/router";
import MediaRenderer from "@/components/common/MediaRenderer.vue";

const { product } = defineProps<{ product: Product }>();

const imagePaths = product.images.map((image) => image.image_path);

const quantity = ref(1);

const navigateToProductDetails = (productId) => {
  router.push({ name: "product-details", params: { id: productId } });
};
</script>

<style scoped>
.ci-image-container .splide__slide {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
