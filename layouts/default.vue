<template>
  <div class="__page-root">
    <BRow class="page-wrapper">
      <BCol cols="12" lg="2" class="border border-primary nav-bar">
        <TheNavbar />
      </BCol>

      <BCol class="px-0">
        <TheHeader class="default-layout-header" />
        <BContainer class="main mt-5">
          <slot></slot>
        </BContainer>
      </BCol>
    </BRow>
    <TheFooter class="default-layout-footer" />
  </div>
</template>

<style scoped>
.nav-bar {
  width: 200px;
}

.__page-root {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
}

.default-layout-footer,
.default-layout-header {
  height: 5em;
}
</style>
