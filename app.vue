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

<style>
:root {
  --brand-primary: rgb(138, 114, 241);
  --brand-primary-hover: rgba(138, 114, 241, 0.8);
  --brand-secondary: rgb(224, 226, 255);
  --brand-secondary-hover: rgba(224, 226, 255, 0.8);
}
body {
  font-family: "Courgette", Helvetica, sans-serif;
  color: rgb(77, 57, 57);
  background-color: var(--brand-secondary);
}

.bg-brand-primary {
  background-color: var(--brand-primary);
}
.bg-brand-secondary {
  background-color: var(--brand-secondary);
}
.bg-brand-light {
  background-color: var(--brand-secondary-hover);
}

.text-brand-secondary {
  color: var(--brand-secondary);
}
.text-brand-primary {
  color: var(--brand-primary);
}
</style>

