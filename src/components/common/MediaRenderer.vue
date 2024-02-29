<template>
  <video
    v-if="source.includes('mp4')"
    :src="imagePath || defaultImage"
    playsinline
    autoplay
    muted
    loop
    @click="handleClick"
    @error="$event.target.src = defaultImage"
  ></video>
  <img
    v-else
    :src="imagePath || defaultImage"
    :alt="altText"
    loading="lazy"
    @click="handleClick"
    @error="$event.target.src = defaultImage"
  />
</template>

<script setup lang="ts">
import defaultImage from "@/assets/empty.jpg";

const { source, altText, onClick } = defineProps(["source", "altText", "onClick"]);

const imagePath = `https://dcwshop.store/images/${source}`

const handleClick = () => {
  if (onClick) {
    onClick();
  }
};
</script>
