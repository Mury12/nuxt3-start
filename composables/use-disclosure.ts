import { Disclosure } from "~~/types";

export const useDisclosure = (): Disclosure => {
  const isOpen = useState(`isOpen_${Math.random()}`, () => false);

  const onOpen = () => {
    isOpen.value = true;
  };

  const onClose = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    isOpen.value = isOpen.value ? false : true;
  };

  return {
    isOpen,
    onOpen,
    onClose,
    toggle,
  };
};
