<template>
  <div class="plus-button d-flex flex-column align-items-center">
    <div
      class="
        plus-signal
        d-flex
        justify-content-center
        align-items-center
        hover
        pointer
      "
      @click="emit('click')"
    >
      +
    </div>
    <div class="text mt-2">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>
<style scoped>
.plus-button {
  user-select: none;
}
.text {
  font-size: 0.8em;
}
.plus-signal {
  height: 1.2em;
  width: 1.2em;
  font-size: 3em;
  border-radius: 1.5em;
  color: white;
  background-color: rgb(110, 132, 219);
}
</style>
