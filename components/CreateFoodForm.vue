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
      </BCol>
      <BCol cols="12" md="6">
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
        <div class="text-end w-100">
          <BButton type="submit" class="mt-3">Salvar</BButton>
        </div>
      </BCol>
    </BRow>
  </form>
</template>

<script lang="ts" setup>
import { Food } from "~~/types";
import { decimalMask } from "@/util/decimal-mask";
import { getMacrosCalories } from "~~/util/get-macros-calories";

const form = ref<Food>({
  name: "",
  calories: undefined,
  carb: undefined,
  prot: undefined,
  tfat: undefined,
  fiber: undefined,
  sodium: undefined,
  weight: undefined,
  unit: "",
});

const kcal = ref(0);

watch(
  form,
  (n) => {
    kcal.value = getMacrosCalories(form.value);
    // Avoid watch trigger but updates but updates the form content
    if (n.calories !== kcal.value) {
      form.value.calories = kcal.value;
    }
  },
  { deep: true }
);

function send() {
  return;
}
</script>
