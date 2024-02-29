<template>
  <transition name="popup-fade">
    <div v-if="visible" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button class="close-button" @click="closePopup">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const { visible, onClose, title } = defineProps([
  "visible",
  "onClose",
  "title",
]);

const closePopup = () => {
  onClose();
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.popup-content {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  text-align: left;
  position: relative;
  margin: 10px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-title {
  margin: 0;
}

.close-button {
  font-size: 32px;
  cursor: pointer;
  border: none;
  background: transparent;
  color: #333;
  outline: none;
}

.close-button span {
  display: block;
}

.close-button:hover {
  color: #ff0000;
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.2s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}
</style>
