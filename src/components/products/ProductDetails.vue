<template>
  <back-button></back-button>
  <navbar></navbar>
  <div class="product-view-wrap active" style="visibility: visible">
    <div class="product-view" style="transform: translateY(0px)">
      <div class="product-view-data">
        <splide
          v-if="imagePaths.length > 1"
          :options="{ rewind: true, pagination: false }"
        >
          <splide-slide v-for="image in imagePaths" :key="image">
            <div class="product-view-data-img-box">
              <media-renderer
                :source="image"
                :alt-text="product.title"
              ></media-renderer>
            </div>
          </splide-slide>
        </splide>
        <div v-else class="ci-thumb">
          <div class="ci-image-container">
            <media-renderer
              :source="imagePaths[0]"
              :alt-text="product.title"
            ></media-renderer>
          </div>
        </div>
        <div class="title-product-card">
          <span>{{ product.title }}</span>
          <span class="weight-product-card"></span>
        </div>
        <div class="product-description">
          <div>{{ product.description }}</div>
          <div style="margin-top: 12px"></div>
          <div v-if="product.strain_type" style="margin-top: 5px">
            <b>Type:</b> {{ product.strain_type.toUpperCase() }}
          </div>
          <div
            v-if="product.feelings && product.feelings.length > 0"
            style="margin-top: 5px"
          >
            <b>Feelings:</b>
            {{ product.feelings.map((elem) => elem.title).join(", ") }}
          </div>
          <div
            v-if="product.genetics && product.genetics.length > 0"
            style="margin-top: 5px"
          >
            <b>Genetics:</b>
            {{ product.genetics.map((elem) => elem.title).join(", ") }}
          </div>
          <div v-if="product.thc" style="margin-top: 5px">
            <b>THC:</b> {{ product.thc }} %
          </div>
          <div v-if="product.cbd" style="margin-top: 5px">
            <b>CBD:</b> {{ product.cbd }}
          </div>
        </div>
        <div class="caption-item-wrap"></div>
      </div>
    </div>
    <div class="product-count-wrap">
      <div class="pcw-btn-group">
        <div class="price-product-card">
          ฿<span>{{ product.price }}</span>
        </div>

        <div v-if="quantity > 0" class="pcw-count-wrap" style="width: auto">
          <quantity-controls
            class="ci-price-counter"
            :product="product"
            :quantity="quantity"
            :max-quantity="product.available_quantity"
            @quantity-changed="updateQuantity"
          ></quantity-controls>
        </div>
        <div class="gto-btn" @click="addToCart">
          <a href="#">{{ t("add_to_cart") }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Product } from "@/types/product";
import QuantityControls from "@/components/products/QuantityControls.vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { useCartStore } from "@/store/cart";
import { BackButton, useWebApp } from "vue-tg";
import Navbar from "@/components/common/Navbar.vue";
import { useI18n } from "@/composables/useI18n";
import MediaRenderer from "@/components/common/MediaRenderer.vue";

const { product } = defineProps<{ product: Product }>();
const cartStore = useCartStore();
const { initDataUnsafe: initData } = useWebApp();
const { t } = useI18n();

const quantity = ref(0);

const imagePaths = product.images.map((image) => image.image_path);

const updateQuantity = (newQuantity: number) => {
  quantity.value = newQuantity;
};

const addToCart = async () => {
  const item = {
    id: product.id,
    title: product.title,
    price: product.price,
    category_id: product.category_id,
    quantity: 1,
  };
  await cartStore.addItem(initData.user.id, item, 1);
  quantity.value = 1;
};
</script>

<style scoped>
.product-view-wrap {
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
}

.product-view-wrap.active .product-count-wrap {
  display: block;
}

.product-view {
  position: relative;
  background-color: #fff !important;
  box-shadow: 0 10px 20px -7px #000;
  height: 100vh;
  margin: 0 auto;
  max-width: 420px;
  min-width: 100%;
  overflow-y: auto;
}

.product-view-data {
  padding: 0 0 100px;
  height: calc(100vh - 75px);
  overflow-x: hidden;
}

.product-view-data-img-box {
  display: flex;
  justify-content: center;
  height: 338px;
  overflow: hidden;
}

.product-view-data-img-box video,
.product-view-data-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-description {
  font-size: 14px;
  line-height: 1.4;
  padding: 0 15px;
}
</style>
