import { Ref } from "nuxt/dist/app/compat/capi";

export interface Disclosure {
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
  isOpen: Ref<Boolean>;
}
