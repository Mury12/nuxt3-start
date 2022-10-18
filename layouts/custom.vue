<template>
  <div class="__page-root">
    <TheHeader />
    <BRow class="border">
      <BCol cols="12" md="10" class="border">
        <BContainer class="main border">
          <slot></slot>
        </BContainer>
      </BCol>
      <BCol cols="12" md="2" class="border">
        <TheNavbar />
      </BCol>
    </BRow>
    <TheFooter class="border" />
  </div>
</template>

<style scoped>
.__page-root {
  max-width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
