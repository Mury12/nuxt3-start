<template>
  <BRow>
    <BCol cols="8" class="d-flex align-items-center">
      <form class="form-control">
        <div class="food-list my-3">
          <div
            class="food py-3 position-relative"
            v-for="(food, idx) in selectedFoods"
            :key="idx"
          >
            <div
              class="remove-item position-absolute text-danger hover pointer"
              @click="removeSelected(food.id)"
            >
              <FaIcon icon="trash" />
            </div>
            {{ food.name }}<br />
            <input
              v-mask="['#####']"
              type="text"
              required
              min="0"
              @input="setMealContent(idx, $event)"
              class="rounded border"
            />
            {{ food.unit }}
            <span class="text-secondary"
              >(1 porção = {{ food.weight }} {{ food.unit }}) </span
            ><br />
            <div class="macro-wrap d-flex flex-wrap gap-sm mt-2">
              <MacroHint :macros="getFoodMacros(food.id)[1]" />
            </div>
          </div>
        </div>
        <DynamicSelector
          :options="foods"
          :fields="fields"
          title="Selecione um alimento"
          :selected="selected"
          @select="setSelected"
          @remove="removeSelected"
          ><PlusButton>Adicionar Alimento</PlusButton></DynamicSelector
        >
        <BButton variant="success" v-if="selected.length">Salvar</BButton>
      </form>
    </BCol>
    <BCol cols="4">
      <BRow>
        <BCol cols="12">
          Sumário<br />---<br />
          Itens: {{ selected.length }} <br />
          <MacroHint :macros="totalMacros" />
        </BCol>
        <BCol cols="12" class="border-top mt-3 pt-2">
          Macros restantes com essa refeição:<br />
          <MacroHint :macros="postAvailableDiet" />
        </BCol>
      </BRow>
    </BCol>
  </BRow>
</template>
 
<script lang="ts" setup>
import { getDietAfterMeal } from "@/util/get-diet-result";

import {
  DynamicSelectorField,
  Food,
  GetFoodsResponse,
  Macro,
  MacroField,
  Meal,
} from "~~/types";

const diet = useComputedDiet();
const foods = useComputedFoods();

const selected = ref<number[]>([]);
const mealContent = ref<Meal[]>([]);

const selectedFoods = computed(() =>
  selected.value.map((foodId) => {
    const foodIdx = foods.value.findIndex((food) => food.id === foodId);
    return foods.value[foodIdx];
  })
);

const postAvailableDiet = computed(() => {
  const obj: Macro = {
    carb: 0,
    calories: 0,
    fiber: 0,
    prot: 0,
    sodium: 0,
    tfat: 0,
  };
  const foodMacros: Macro = selectedFoods.value.reduce((acc, food) => {
    Object.keys(obj).forEach((key: keyof Macro) => {
      acc[key] += getFoodMacros(food.id)[0][key];
      return acc;
    });
    return acc;
  }, obj);
  return getDietAfterMeal(diet.value.available, foodMacros);
});

const totalMacros = computed(() => {
  const result: Record<string, MacroField> = selectedFoods.value.reduce(
    (acc, food) => {
      const [, macros] = getFoodMacros(food.id);
      macros.forEach((macro) => {
        if (!acc[macro.name]) acc[macro.name] = { ...macro };
        else acc[macro.name].value += macro.value;
      });

      return acc;
    },
    {}
  );

  return Object.values(result);
});

const fields: DynamicSelectorField<Food> = {
  label: "name",
  value: "id",
  showInfo: [
    {
      key: "calories",
      label: "Calorias",
    },
    {
      key: "carb",
      label: "Carboidratos",
      suffix: "g",
    },
    {
      key: "prot",
      label: "Proteinas",
      suffix: "g",
    },
    {
      key: "tfat",
      label: "Gorduras Totais",
      suffix: "g",
    },
    {
      key: "sodium",
      label: "Sódio",
      suffix: "mg",
    },
    {
      key: "fiber",
      label: "Fibras",
      suffix: "g",
    },
    {
      key: "weight",
      label: "Quantidade",
    },
    {
      key: "unit",
      label: "Medida",
    },
  ],
};

function setMealContent(idx: number, e) {
  mealContent.value[idx].qtd = e.target.value;
}

function getFoodMacros(id: number): [Macro, MacroField[]] {
  const macroFields = <MacroField[]>[];

  const foodIdx = foods.value.findIndex((food) => food.id === id);
  const { calories, carb, fiber, prot, tfat, weight, sodium } =
    foods.value[foodIdx];

  const mealContentIdx = mealContent.value.findIndex(
    (meal) => meal.foodId === id
  );
  const amount = mealContent.value[mealContentIdx].qtd;
  const radix = amount / weight;
  const macrosObj: Macro = {
    calories: Math.round(radix * calories),
    carb: Math.round(radix * carb),
    prot: Math.round(radix * prot),
    tfat: Math.round(radix * tfat),
    sodium: Math.round(radix * sodium),
    fiber: Math.round(radix * fiber),
  };
  macroFields.push(
    {
      name: "Calorias",
      value: macrosObj.calories,
    },
    {
      name: "Carboidratos",
      value: macrosObj.carb,
      measure: "g",
    },
    {
      name: "Proteinas",
      value: macrosObj.prot,
      measure: "g",
    },
    {
      name: "Gorduras",
      value: macrosObj.tfat,
      measure: "g",
    },
    {
      name: "Sódio",
      value: macrosObj.sodium,
      measure: "mg",
    },
    {
      name: "Fibras",
      value: macrosObj.fiber,
      measure: "g",
    }
  );

  return [macrosObj, macroFields];
}

function removeSelected(foodId) {
  const idx = selected.value.indexOf(foodId);
  selected.value.splice(idx, 1);
  mealContent.value.splice(idx, 1);
}

function setSelected(foodId) {
  selected.value.push(foodId);
  mealContent.value.push({
    foodId: foodId,
    qtd: 0,
  });
}
</script>
<style scoped>
.food {
  border-bottom: 1px dashed var(--bs-secondary);
}

.form-control {
  border: none !important;
}
input[type="text"] {
  width: 5ch;
}
.remove-item {
  left: -25px;
  top: 50%;
}
</style>
