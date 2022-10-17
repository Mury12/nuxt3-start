<template>
  <div class="__page-root bg-red">
    <BRow class="border">
      <BCol cols="12" md="2" class="border">
        <TheNavbar />
      </BCol>

      <BCol cols="12" md="10" class="border">
        <TheHeader />
        <BContainer class="main border">
          <slot></slot>
        </BContainer>
      </BCol>
    </BRow>
    <TheFooter class="border" />
  </div>
</template>

<style scoped>
.__page-root {
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
}
.bg-red {
  background: red;
}
</style>
