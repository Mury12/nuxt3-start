<template>
  <BBadge variant="light" class="border">
    {{ macro.name }}: {{ macro.value }}{{ macro.measure }}
  </BBadge>
</template>

<script setup lang="ts">
import { MacroField } from "~~/types";

const { macro } = defineProps<{
  macro: MacroField;
}>();
</script>
