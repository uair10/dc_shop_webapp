<template>
  <popup :visible="visible" :on-close="onClose">
    <div class="modal-content">
      <img
        :src="imageUrl"
        :style="{ transform: `scale(${scale})`, transformOrigin: zoomOrigin }"
        alt="Zoomable Image"
        @mousemove="handleMouseMove"
        @mouseleave="resetZoom"
      />
    </div>
  </popup>
</template>

<script setup lang="ts">
import Popup from "@/components/popups/Popup.vue";
import { ref } from "vue";

const scale = ref(1);
const zoomOrigin = ref("center center");
const { visible, onClose, imageUrl } = defineProps([
  "visible",
  "onClose",
  "imageUrl",
]);

const handleMouseMove = (event: MouseEvent) => {
  const boundingRect = (event.target as HTMLElement).getBoundingClientRect();
  const offsetX = (event.clientX - boundingRect.left) / boundingRect.width;
  const offsetY = (event.clientY - boundingRect.top) / boundingRect.height;

  scale.value = 2; // Adjust the zoom factor as needed
  zoomOrigin.value = `${offsetX * 100}% ${offsetY * 100}%`;
};

const resetZoom = () => {
  scale.value = 1;
};
</script>

<style scoped>
.zoomable-image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  overflow: hidden;
}

img {
  transition: transform 0.3s ease-out;
  display: block;
  max-width: 100%;
  max-height: 100%;
}
</style>
