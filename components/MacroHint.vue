<template>
  <div class="d-flex flex-wrap gap-sm">
    <MacroHintSingle
      v-for="(macro, macroIdx) in macros"
      :key="macroIdx"
      :macro="macro"
    />
  </div>
</template>

<script setup lang="ts">
import { MacroField } from "~~/types";

const { macros } = defineProps<{
  macros: MacroField[];
}>();
</script>
