<template>
  <BRow :style="{ gap: '10px' }" class="justify-content-center">
    <div
      v-for="(meal, idx) in meals"
      :key="idx"
      class="food border rounded p-3 position-relative"
    >
      {{ meal.food.name }} - x{{ meal.stats.amount }}<br />
        <MacroHint :macros="macroToMacroField(meal.stats.macros)" />
    </div>
  </BRow>
</template>

<script lang="ts" setup>
import { GetMealsResponse } from "@/types";
import { macroToMacroField } from "~~/util/macro-to-macro-field";

defineProps<{ meals: GetMealsResponse }>();
</script>
<style scoped>
.food {
  width: 250px;
}
.food:hover .hover-macros {
  opacity: 1;
}
.hover-macros {
  width: 300px;
  opacity: 0;
  z-index: -1;
  background-color: black;
}
</style>
