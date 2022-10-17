<template>
  <NuxtLayout :name="layout" :key="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const layout = useLayout();

    return { layout };
  },
});
</script>

