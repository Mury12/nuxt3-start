<template>
  <div class="header">
    <button @click="toggleLayout" :class="btnClass">Layout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const layout = useLayout();

    function btnClass() {
      return layout.value === "custom" ? "bg-red" : "bg-blue";
    }
    function toggleLayout() {
      layout.value = layout.value === "custom" ? "default" : "custom";
    }
    return { layout, btnClass, toggleLayout };
  },
});
</script>

<style scoped>
.header {
  width: 100%;
  border: 1px dashed black;
}
.bg-red {
  background: red;
}
.bg-blue {
  background: blue;
}
</style>
