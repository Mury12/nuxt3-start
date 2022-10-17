<template>
  <div>
    <h1>Hello Nuxt3! {{ counter }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const counter = useCounter();

    return { counter };
  },
});
</script>
