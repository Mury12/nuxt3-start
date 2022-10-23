<template>
  <BRow class="new-diet-form my-3 rounded">
    <BCol cols="12" md="6">
      <form @submit.prevent="send" class="form-control">
        <label>Tipo de cálculo:</label>
        <BFormSelect v-model="strategy">
          <option value="calories">Calorias</option>
          <option value="weight">Por peso</option>
          <option value="free">Manual</option> </BFormSelect
        ><br />

        <BRow>
          <BCol cols="12" v-if="strategy === 'weight'">
            <label>Estratégia</label> <br />
            <BFormRadioGroup v-model="goal">
              <BFormRadio :value="StrategyMult.gain" checked
                >Leve (-déficit)</BFormRadio
              >
              <BFormRadio :value="StrategyMult.keep">Normal</BFormRadio>
              <BFormRadio :value="StrategyMult.loss"
                >Agressiva (+déficit)</BFormRadio
              >
            </BFormRadioGroup>
          </BCol>
          <BCol cols="12" md="6"
            ><label for="daily-weight">Peso Inicial</label>
            <BFormInput
              type="text"
              name="weight"
              v-model="weight"
              v-mask="decimalMask"
          /></BCol>
          <BCol cols="12" md="6"
            ><label for="daily-weight">Peso Meta</label>
            <BFormInput
              type="text"
              name="weight"
              v-model="goalWeight"
              v-mask="decimalMask"
          /></BCol>
          <BCol cols="12" md="6"
            ><label for="daily-kcal">Calorias ao dia</label>
            <BFormInput
              type="text"
              name="kcal"
              v-mask="['######']"
              v-model="kcal"
              :readonly="/free|weight/gi.test(strategy)"
          /></BCol>
          <BCol cols="12" md="6"
            ><label for="daily-carb">Carboidratos</label>
            <BFormInput
              type="text"
              name="carb"
              v-mask="['###']"
              v-model="carb"
              :readonly="/calories|weight/gi.test(strategy)"
          /></BCol>
          <BCol cols="12" md="6"
            ><label for="daily-prot">Proteinas</label>
            <BFormInput
              type="text"
              name="prot"
              v-mask="['###']"
              v-model="prot"
              :readonly="/calories|weight/gi.test(strategy)"
          /></BCol>
          <BCol cols="12" md="6">
            <label for="daily-tfat">Gorduras</label>
            <BFormInput
              type="text"
              name="tfat"
              v-mask="['###']"
              v-model="tfat"
              :readonly="/calories|weight/gi.test(strategy)"
          /></BCol>
        </BRow>
        <div class="text-end w-100">
          <BButton type="submit" class="mt-3">Salvar</BButton>
        </div>
      </form>
    </BCol>
    <BCol cols="6">
      <div class="px-2">
        <div class="guide d-flex flex-column mb-3 pb-3 border-bottom">
          <StrategyInstructions :strategy="strategy" />
        </div>
        <table class="table table-stripped table-hover">
          <thead>
            <th colspan="2" class="text-center border-bottom">
              Base de cálculo
            </th>
          </thead>
          <tbody>
            <tr>
              <td>Carboidratos</td>
              <td>
                {{ macroMult.carb * MacroMultiplier.carbohydrates * 100 }}%
              </td>
            </tr>
            <tr>
              <td>Proteinas</td>
              <td>{{ macroMult.prot * MacroMultiplier.protein * 100 }}%</td>
            </tr>
            <tr>
              <td>Gorduras</td>
              <td>{{ macroMult.tfat * MacroMultiplier.fat * 100 }}%</td>
            </tr>
            <tr>
              <td>Sódio:</td>
              <td>~2000mg</td>
            </tr>
            <tr>
              <td>Fibras</td>
              <td>~70g</td>
            </tr>
          </tbody>
        </table>
        <p>
          Referências:
          <a
            href="https://www.healthline.com/nutrition/best-macronutrient-ratio#bottom-line"
          >
            Healthline
          </a>
        </p>
      </div>
    </BCol>
  </BRow>
</template>
<script lang="ts" setup>
import {
  Diet,
  DietGenStrategy,
  Macro,
  StrategyMult,
  MacroMultiplier,
} from "@/types";
import { decimalMask } from "@/util/decimal-mask";
import { assertOptionalCallExpression } from "@babel/types";
import { apiClient } from "~~/util/ApiClient";
import { getMacrosCalories } from "~~/util/get-macros-calories";

const strategy = ref<DietGenStrategy>("weight");
const kcal = ref(0);
const carb = ref(0);
const prot = ref(0);
const tfat = ref(0);
const weight = ref(0);
const goalWeight = ref<string>("0");

const macroMult = useMacroDistribution().value;
const goal = ref<StrategyMult>(StrategyMult.loss);

const totalKcal = computed(() => {
  if (strategy.value === "calories") return kcal.value;
  if (strategy.value === "free")
    return getMacrosCalories({
      prot: prot.value,
      tfat: tfat.value,
      carb: carb.value,
    });
  return Math.round(((+weight.value + +goalWeight.value) / 2) * goal.value);
});

const distributedMacros = computed<Partial<Macro>>(() => ({
  tfat: Math.floor(totalKcal.value * macroMult.tfat),
  prot: Math.floor(totalKcal.value * macroMult.prot),
  carb: Math.floor(totalKcal.value * macroMult.carb),
}));

function setMacros() {
  const dist = distributedMacros.value;
  tfat.value = dist.tfat;
  carb.value = dist.carb;
  prot.value = dist.prot;
}

watch([kcal, goal], () => {
  if (strategy.value === "calories") {
    setMacros();
  }
});

watch([tfat, carb, prot, goal], () => {
  if (strategy.value === "free") {
    kcal.value = totalKcal.value;
  }
});

watch(weight, () => {
  goalWeight.value = (weight.value - 5).toFixed(2);
});

watch([goalWeight, goal], () => {
  if (strategy.value === "weight") {
    kcal.value = totalKcal.value;
    setMacros();
  }
});

async function send() {
  const result = await apiClient.createDiet({
    weight: weight.value,
    carb: carb.value,
    prot: prot.value,
    tfat: tfat.value,
  });
  console.debug(result);
}
</script>

<style scoped>
.new-diet-form {
  text-align: left;
}

.guide {
  row-gap: 1em;
}
</style>
