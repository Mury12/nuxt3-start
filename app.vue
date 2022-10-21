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
.close {
  right: 10px;
  top: 0;
  font-size: 1.5em;
  color: var(--bs-secondary);
  cursor: pointer;
}
/** Transitions */

.inactive {
  opacity: 0.4;
}
.fade-enter-actifadee,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dig-out-enter-active {
  transition: 0.2s ease-in-out;
}
.dig-out-leave-active {
  transition: 0.2s ease-in-out;
}
.dig-out-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.dig-out-enter {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-left-enter-active {
  transition: 0.5s ease-in-out;
}
.slide-left-leave-active {
  transition: 0.5s ease-in-out;
}
.slide-left-leave-to {
  transform: translateX(20px);
  height: 0 !important;
  padding: 0 !important;
  opacity: 0;
}
.shrink-enter-active {
  transition: 0.5s ease-in-out;
}
.shrink-leave-active {
  transition: 0.5s ease-in-out;
}
.shrink-leave-to {
  height: 0 !important;
  padding: 0 !important;
  opacity: 0;
}
.shrink-enter {
  opacity: 0;
  height: 0 !important;
}

.default-transition {
  transition: ease-in-out 200ms;
}
</style>

