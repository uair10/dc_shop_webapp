<template>
  <div class="catalog-item">
    <div class="catalog-item-product">
      <div class="ci-thumb">
        <div class="ci-image-container">
          <skeleton-box width="100%" height="150px" />
        </div>
      </div>
      <skeleton-box width="50%" height="10px" />
      <skeleton-box width="90%" height="10px" />
      <skeleton-box width="90%" height="10px" />
      <skeleton-box width="90%" height="10px" />
    </div>
    <div class="ci-price-counter">
      <skeleton-box width="100%" height="30px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SkeletonBox from "@/components/common/Skeleton.vue";
</script>
<style scoped>
.ci-image-container {
  padding-top: 0;
}
.ci-price-counter {
  padding-top: 10px;
}
</style>
