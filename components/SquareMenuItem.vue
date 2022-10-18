<template>
  <div class="square-menu-item rounded bg-brand-primary hover pointer">
    <BRow class="justify-content-center align-items-center py-3 h-100">
      <BCol
        cols="12"
        class="menu-item-image"
        :style="{
          backgroundImage: `url(${image})`,
        }"
      >
      </BCol>
      <BCol cols="12" class="menu-item-text">
        {{ title }}
      </BCol>
    </BRow>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Item",
  },
  image: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.square-menu-item {
  text-align: center;
  height: 180px;
  width: 180px;
}
.menu-item-image {
  height: 100px;
  width: 100px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50px;
}

.menu-item-text {
  color: white;
}
</style>
