<template>
  <BRow :style="{ gap: '10px' }">
    <BCol
      v-for="(meal, idx) in meals"
      :key="idx"
      class="border rounded bg-brand-secondary shadow-sm pointer hover"
    >
      {{ meal.food.name }} - x{{ meal.stats.amount }}<br />
      {{ meal.stats.macros.calories }}Kcal
    </BCol>
  </BRow>
</template>

<script lang="ts" setup>
import { GetMealsResponse } from "@/types";

defineProps<{ meals: GetMealsResponse }>();
</script>
