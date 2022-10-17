<template>
  <div>
    <HelloWorld />
    <button @click="increase">Add</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const count = useCounter();
    function increase(e: MouseEvent) {
      count.value++;
    }

    return {
      count,
      increase,
    };
  },
});
</script>
