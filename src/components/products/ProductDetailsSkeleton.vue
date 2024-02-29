<template>
  <back-button></back-button>
  <navbar></navbar>
  <div class="product-view-wrap active" style="visibility: visible">
    <div class="product-view" style="transform: translateY(0px)">
      <div class="product-view-data">
        <div class="product-view-data-img-box">
          <skeleton-box width="100%" height="auto" />
        </div>
        <skeleton-box width="auto" />
        <div class="title-product-card">
          <skeleton-box width="120px" height="20px" />
          <span class="weight-product-card"></span>
        </div>
        <div class="product-description">
          <skeleton-box width="50%" height="12px" />
          <skeleton-box width="90%" height="12px" />
          <skeleton-box width="60%" height="12px" />
          <skeleton-box width="70%" height="12px" />
          <skeleton-box width="80%" height="12px" />
          <div style="margin-top: 12px"></div>
        </div>
        <div class="caption-item-wrap"></div>
      </div>
    </div>
    <div class="product-count-wrap">
      <div class="pcw-btn-group">
        <skeleton-box class="price-product-card" width="70px" height="35px" />
        <skeleton-box class="gto-btn" width="auto" height="35px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BackButton } from "vue-tg";
import Navbar from "@/components/common/Navbar.vue";
import SkeletonBox from "@/components/common/Skeleton.vue";
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
.product-view-data-img-box img,
.product-view-data-img-box skeleton-box {
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
