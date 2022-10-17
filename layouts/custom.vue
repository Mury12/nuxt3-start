<template>
  <TheHeader />
  <div class="bg-blue">
    <slot></slot>
  </div>
</template>

<style scoped>
.bg-blue {
  background: blue;
}
</style>
