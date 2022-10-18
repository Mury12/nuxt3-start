<template>
  <BRow class="justify-content-center" :style="{ gap: '5px' }">
    <SquareMenuItem title="Minha Dieta" image="/img/dieta.png"/>
    <SquareMenuItem title="Nova Dieta" image="/img/dieta.png"/>
    <SquareMenuItem title="Adicionar Alimento" image="/img/alimento.png"/>
    <SquareMenuItem title="Cadastrar Alimento" image="/img/nalimento.png"/>
  </BRow>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

