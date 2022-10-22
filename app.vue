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
.gap-sm {
  gap: 0.3em;
}
.gap-md {
  gap: 0.5em;
}
.gap-lg {
  gap: 0.7em;
}
.row-gap-sm {
  row-gap: 0.3em;
}
.row-gap-md {
  row-gap: 0.5em;
}
.row-gap-lg {
  row-gap: 0.7em;
}

/** Transitions */

.inactive {
  opacity: 0.4;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease !important;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0 !important;
}

.dig-out-enter-active {
  transition: 0.2s ease-in-out !important;
}
.dig-out-leave-active {
  transition: 0.2s ease-in-out !important;
}
.dig-out-leave-to {
  transform: translateY(100%) !important;
  opacity: 0 !important;
}
.dig-out-enter-from {
  transform: translateY(-100%) !important;
  opacity: 0 !important;
}
.default-transition {
  transition: ease-in-out 200ms !important;
}

.badge {
  font-weight: lighter;
  font-size: 0.8em;
}
</style>

