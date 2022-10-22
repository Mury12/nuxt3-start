<template>
  <form @submit.prevent="send" class="form-control">
    <BRow class="new-diet-form my-3 rounded">
      <BCol cols="12" md="6">
        <label for="daily-name">Nome</label>
        <BFormInput type="text" name="name" v-model="form.name" />
        <label for="daily-carb">Carboidratos</label>
        <BFormInput
          type="text"
          name="carb"
          v-model="form.carb"
          v-mask="decimalMask"
          required
        />
        <label for="daily-prot">Proteinas</label>
        <BFormInput
          type="text"
          name="prot"
          v-model="form.prot"
          v-mask="decimalMask"
          required
        />
        <label for="daily-tfat">Gorduras</label>
        <BFormInput
          type="text"
          name="tfat"
          v-model="form.tfat"
          v-mask="decimalMask"
          required
        />
        <label for="daily-sodium">Sódio</label>
        <BFormInput
          type="text"
          name="sodium"
          v-model="form.sodium"
          v-mask="decimalMask"
          required
        />
        <label for="daily-fiber">Fibras</label>
        <BFormInput
          type="text"
          name="fiber"
          v-model="form.fiber"
          v-mask="decimalMask"
          required
        />

        <div class="text-end w-100">
          <BButton type="submit" class="mt-3">Salvar</BButton>
        </div>
      </BCol>
      <BCol cols="6">
        <div class="px-2">
          <h2>Instruções:</h2>
          <ol class="guide d-flex flex-column">
            <li>
              Insira os macronutrientes do seu alimento de acordo com a
              embalagem.
            </li>

            <li>Salve seu alimento e use-o em sua dieta!</li>
          </ol>
        </div>
        <label for="daily-kcal">Calorias</label>
        <BFormInput
          type="text"
          name="kcal"
          v-model="kcal"
          :mask="decimalMask"
          required
        />
        <label for="daily-weight">Quantidade por porção</label>
        <BFormInput
          type="text"
          placeholder="Quandidade de acordo com a unidade"
          name="weight"
          v-model="form.weight"
          v-mask="decimalMask"
          required
        />
        <label for="daily-weight">Unidade</label>
        <BFormInput
          placeholder="g, mg, fatia, colher"
          type="text"
          name="weight"
          v-model="form.unit"
        />
      </BCol>
    </BRow>
  </form>
</template>

<script lang="ts" setup>
import { Food, MacroMultiplier } from "~~/types";
import { decimalMask } from "@/util/decimal-mask";
import { debounce } from "~~/util/debounce";

const form = ref<Food>({
  calories: undefined,
  carb: undefined,
  prot: undefined,
  tfat: undefined,
  fiber: undefined,
  name: "",
  sodium: undefined,
  unit: "",
  weight: undefined,
});

const kcal = computed(() => {
  const { carb, tfat, prot } = form.value;
  return Math.ceil(
    (carb || 0) * MacroMultiplier.carbohydrates +
      (tfat || 0) * MacroMultiplier.fat +
      (prot || 0) * MacroMultiplier.protein
  );
});

function send() {
  return;
}
</script>
