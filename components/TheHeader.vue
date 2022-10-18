<template>
  <div class="header bg-brand-primary px-5">
    <BRow class="h-100 align-items-center">
      <BCol cols="12" lg="10">
        <BButton :variant="btnClass" @click="toggleLayout">Layout</BButton>
      </BCol>
      <BCol cols="12" lg="2" class="d-flex justify-content-end">
        <div
          class="
            profile-img
            hover
            pointer
            d-flex
            justify-content-center
            align-items-center
            bg-warning
            user-select-none
            text-primary
          "
        >
          A
        </div>
      </BCol>
    </BRow>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const layout = useLayout();

    const btnClass = computed(() => {
      return layout.value === "custom" ? "danger" : "info";
    });

    function toggleLayout() {
      layout.value = layout.value === "custom" ? "default" : "custom";
    }
    return { layout, btnClass, toggleLayout };
  },
});
</script>

<style scoped>
.profile-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  font-size: 2em;
  font-family: 'Courier New', Courier, monospace;
}
.header {
  width: 100%;
}
</style>
