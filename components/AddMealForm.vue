<template>
  <BRow>
    <BCol cols="12" md="8" class="d-flex align-items-center border-end">
      <form class="form-control" @submit.prevent="send">
        <div class="food-list d-flex flex-wrap gap-lg">
          <div
            class="food pb-3 position-relative"
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
              v-mask="decimalMask"
              placeholder="10.00"
              type="text"
              required
              min="0"
              @input="setMealContent(idx, $event)"
              class="rounded border"
            />
            {{ food.unit }}
            <span class="text-secondary">
              (1 porção = {{ food.weight }} {{ food.unit }}) </span
            ><br />
            <div class="macro-wrap d-flex flex-wrap gap-sm mt-2">
              <MacroHint :macros="getFoodMacros(food.id)[1]" />
            </div>
          </div>
        </div>
        <DynamicSelector
          title="Selecione um alimento"
          class="mt-3"
          :options="foods"
          :fields="fields"
          :selected="selected"
          :key="foods.length"
          @select="setSelected"
          @remove="removeSelected"
          ><PlusButton>Adicionar Alimento</PlusButton></DynamicSelector
        >
        <div class="w-100 text-end">
          <BButton variant="success" type="submit" v-if="selected.length"
            >Salvar</BButton
          >
        </div>
      </form>
    </BCol>
    <BCol cols="12" md="4">
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
import { decimalMask } from "@/util/decimal-mask";

import {
  DynamicSelectorField,
  Food,
  GetFoodsResponse,
  Macro,
  MacroField,
  Meal,
} from "~~/types";
import { apiClient } from "~~/util/ApiClient";

const diet = useComputedDiet();
const foods = useComputedFoods();
const meals = useComputedMeals();

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
function cleanForm() {
  selected.value.splice(0, -1);
  mealContent.value.splice(0, -1);
  selectedFoods.value.splice(0, -1);
}

async function send() {
  const result = await apiClient.createMeal(mealContent.value);
  console.log("Meal create", result);
  cleanForm();

  const updatedDiet = await apiClient.fetchDietStats(diet.value.id);
  diet.value = updatedDiet;

  const updatedMeals = await apiClient.fetchTodayMeals();
  meals.value = updatedMeals;
}

async function fetchFoods() {
  const result = await apiClient.fetchFoods();
  foods.value = result;
}

onMounted(() => {
  nextTick(() => {
    fetchFoods();
  });
});
</script>
<style scoped>
.food {
  border-bottom: 1px dashed var(--bs-border-color);
}

.form-control {
  border: none !important;
}
input[type="text"] {
  width: 8ch;
}
.remove-item {
  left: -25px;
  top: 50%;
}
</style>
