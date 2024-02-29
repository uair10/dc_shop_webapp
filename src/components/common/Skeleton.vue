<template>
  <div :style="{ height, width: computedWidth }" class="skeleton-box" />
</template>

<script lang="ts">
export default {
  name: `SkeletonBox`,
  props: {
    maxWidth: {
      default: 100,
      type: Number,
    },
    minWidth: {
      default: 80,
      type: Number,
    },
    height: {
      default: `1em`,
      type: String,
    },
    width: {
      default: null,
      type: String,
    },
  },
  computed: {
    computedWidth() {
      return (
        this.width ||
        `${Math.floor(
          Math.random() * (this.maxWidth - this.minWidth) + this.minWidth,
        )}%`
      );
    },
  },
};
</script>

<style scoped lang="scss">
.skeleton-box {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  background-color: #dddbdd;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}

.ci-image-container .skeleton-box {
  position: relative;
  width: 100%;
  padding-top: 100%;
  object-fit: cover;
  border-radius: 15px 15px 7px 7px;
}

.ci-price-counter .skeleton-box {
  align-items: center;
  background-color: #f3f2f7;
  border-radius: 11px;
  display: flex;
  cursor: pointer;
  flex-wrap: wrap;
  line-height: 0;
  justify-content: center;
}
</style>
