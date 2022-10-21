<template>
  <div class="loading d-flex w-100 justify-content-center text-success">
    <div class="svg-icon">.</div>
    <div class="svg-icon">.</div>
    <div class="svg-icon">.</div>
  </div>
</template>
<style scoped>
.loading .svg-icon {
  animation: bounce infinite 1s;
  font-size: 3em !important;
  color: var(--success);
}
.loading .svg-icon:nth-of-type(2) {
  animation-delay: 100ms;
}

.loading .svg-icon:nth-of-type(3) {
  animation-delay: 200ms;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  75%,
  100% {
    transform: translateY(0);
  }
}
</style>
