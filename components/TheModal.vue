<template>
  <div class="v-modal" v-if="show" :class="isOpen ? 'fade-in' : 'fade-out'">
    <div class="d-flex justify-content-center px-5 --container">
      <BRow class="justify-content-center w-100">
        <div class="backdrop" @click="$emit('close')" />
        <BCol cols="12" xl="6">
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
            <BCol cols="12" class="modal--body py-3">
              <slot name="body"></slot>
            </BCol>
            <BCol
              cols="12"
              class="modal--footer border-top pt-3 text-end"
              v-if="showFooter"
            >
              <slot name="footer">
                <BButton
                  variant="warning"
                  @click="$emit('close')"
                  v-if="!okOnly"
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
    </div>
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
    okOnly: {
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
      if (!n)
        setTimeout(() => {
          this.show = n;
        }, 200);
      else this.show = n;
    },
    hideFooter(n) {
      this.showFooter = !n;
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
  width: 100vw;
  height: 100vh;
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
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.125);
}
.modal-wrapper {
  position: relative;
  height: fit-content;
}
.--container {
  overflow-y: auto;
  height: 100%;
  max-height: 100vh;
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
