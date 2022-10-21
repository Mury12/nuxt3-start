<template>
  <BBadge
    v-for="(macro, macroIdx) in macros"
    :key="macroIdx"
    variant="light"
    class="border"
  >
    {{ macro.name }}: {{ macro.value }}{{ macro.measure }}
  </BBadge>
</template>

<script setup lang="ts">
import { MacroField } from "~~/types";

const { macros } = defineProps<{
  macros: MacroField[];
}>();
</script>
