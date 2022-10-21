<template>
  <BRow class="justify-content-center" :style="{ gap: '5px' }">
    <SquareMenuItem
      title="Minha Dieta"
      image="/img/dieta.png"
      @click="setSelected(1)"
    />
    <SquareMenuItem
      title="Nova Dieta"
      image="/img/dieta.png"
      @click="setSelected(2)"
    />
    <SquareMenuItem
      title="Adicionar Refeição"
      image="/img/alimento.png"
      @click="setSelected(3)"
    />
    <SquareMenuItem
      title="Cadastrar Alimento"
      image="/img/nalimento.png"
      @click="setSelected(4)"
    />
  </BRow>
  <TheModal :is-open="isOpen" @ok="onClose" @close="onClose" ok-only>
    <template #head>
      {{ modalTitle }}
    </template>
    <template #body>
      <MyDietForm v-if="selected === 1" />
      <NewDietForm v-if="selected === 2" />
      <AddMealForm v-if="selected === 3" />
      <CreateFoodForm v-if="selected === 4" />
    </template>
  </TheModal>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const selected = ref(0);
    const { isOpen, toggle, onClose, onOpen } = useDisclosure();
    const modalTitle = computed(function () {
      return selected.value === 1
        ? "Minha Dieta"
        : selected.value === 2
        ? "Nova Dieta"
        : selected.value === 3
        ? "Adicionar Refeição"
        : "Cadastrar Novo Alimento";
    });

    function setSelected(idx: number) {
      toggle();
      this.selected = idx;
    }

    return {
      selected,
      setSelected,
      isOpen,
      toggle,
      onClose,
      onOpen,
      modalTitle,
    };
  },
});
</script>

