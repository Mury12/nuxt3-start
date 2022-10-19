<template>
  <div class="v-modal" v-if="show" :class="isOpen ? 'fade-in' : 'fade-out'">
    <BContainer class="d-flex justify-content-center">
      <BRow class="justify-content-center w-100">
        <BCol cols="12" xl="6">
          <div class="backdrop" @click="$emit('close')" />
          <BRow
            class="
              modal-wrapper
              d-flex
              justify-content-center
              align-items-center
              bg-white
              border
              shadow
              w-100
              rounded
              mt-5
              p-3
            "
          >
            <BCol cols="12" class="modal--header border-bottom pb-3">
              <h3>
                <slot name="head"></slot>
              </h3>
            </BCol>
            <BCol cols="12" class="modal--body pb-3">
              <slot name="body"></slot>
            </BCol>
            <BCol
              cols="12"
              class="modal--footer border-top pt-3 text-end"
              v-if="showFooter"
            >
              <slot name="footer">
                <BButton variant="warning" @click="$emit('close')"
                  >Cancel</BButton
                >
                <BButton
                  variant="success"
                  @click="$emit('ok')"
                  :style="{ marginLeft: '0.5em' }"
                  >Ok</BButton
                >
              </slot>
            </BCol>
          </BRow>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const show = ref(false);
    const showFooter = true;
    return { show, showFooter };
  },

  watch: {
    isOpen(n) {
      setTimeout(() => {
        this.show = n;
      }, 200);
    },
    hideFooter(n) {
      this.showFooter = !this.hideFooter;
    },
  },
});
</script>

<style scoped>
.v-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  height: 100vh;
  width: 100vw;
}
.fade-in {
  animation: fade-in forwards 200ms;
}
.fade-out {
  animation: fade-out forwards 200ms;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.125);
}
.modal-wrapper {
  position: relative;
  height: 100%;
}

@keyframes fade-in {
  0% {
    transform: translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-5px);
    opacity: 0;
  }
}
</style>
