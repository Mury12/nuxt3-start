<template>
  <div
    class="option bg-light hover pointer px-2 py-3 rounded"
    :class="{ active }"
  >
    {{ item[fields.label] }}<br />
    <div class="option-meta d-flex flex-wrap gap-sm" v-if="fields.showInfo">
      <div
        v-for="(info, idx) in fields.showInfo"
        :key="idx"
        variant="light"
        class="border rounded px-3"
      >
        <small
          >{{ info.label }}: {{ item[info.key] }}{{ info.suffix || "" }}</small
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DynamicSelectorField } from "~~/types";

const { active, fields } = defineProps<{
  active: boolean;
  fields: DynamicSelectorField<any>;
  item: any;
}>();
</script>
<style scoped>
.food-item {
  width: 100px;
}
.option {
  box-sizing: border-box;
  border: 1px solid transparent;
}
.active {
  /* background-color: var(--brand-secondary) !important; */
  border: 1px solid var(--brand-primary-hover);
}
</style>
