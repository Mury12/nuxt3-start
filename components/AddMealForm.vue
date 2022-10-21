<template>
  <BRow>
    <BCol cols="8">
      <form class="form-control">
        <div class="food-list my-3">
          <div
            class="food py-3"
            v-for="(food, idx) in selectedFoods"
            :key="idx"
          >
            {{ food.name }}<br />
            <input
              type="number"
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
              <BBadge
                v-for="(macro, macroIdx) in getFoodMacros(food.id)"
                :key="macroIdx"
                variant="light"
                class="border"
              >
                {{ macro.name }}: {{ macro.value }}{{ macro.measure }}
              </BBadge>
            </div>
          </div>
        </div>
        <DynamicSelector
          :options="foods"
          :fields="fields"
          title="Selecione um alimento"
          @select="setSelected"
          @remove="removeSelected"
        />
        <BButton variant="success" v-if="selected.length">Salvar</BButton>
      </form>
    </BCol>
    <BCol cols="4">
      Sumário<br />---<br />
      Itens: {{ selected.length }} <br />
      <MacroHint :macros="totalMacros" />
    </BCol>
  </BRow>
</template>
 
<script lang="ts" setup>
import foodsMock from "@/util/foods.mock";

import {
  DynamicSelectorField,
  Food,
  GetFoodsResponse,
  GetMealsResponse,
  Macro,
  MacroField,
  Meal,
} from "~~/types";

const selected = ref<number[]>([]);
const foods = ref<GetFoodsResponse>(foodsMock);

const mealContent = ref<Meal[]>([]);

const selectedFoods = computed(() =>
  selected.value.map((foodId) => {
    const foodIdx = foods.value.findIndex((food) => food.id === foodId);
    return foods.value[foodIdx];
  })
);

const totalMacros = computed(() => {
  const result: Record<string, MacroField> = selectedFoods.value.reduce(
    (acc, food) => {
      const macros = getFoodMacros(food.id);
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

function getFoodMacros(id: number): MacroField[] {
  const macros = <MacroField[]>[];
  const foodIdx = foods.value.findIndex((food) => food.id === id);
  const { calories, carb, fiber, prot, tfat, weight, sodium } =
    foods.value[foodIdx];

  const mealContentIdx = mealContent.value.findIndex(
    (meal) => meal.foodId === id
  );
  const amount = mealContent.value[mealContentIdx].qtd;
  const radix = amount / weight;
  macros.push(
    {
      name: "Calorias",
      value: Math.round(radix * calories),
    },
    {
      name: "Carboidratos",
      value: Math.round(radix * carb),
      measure: "g",
    },
    {
      name: "Proteinas",
      value: Math.round(radix * prot),
      measure: "g",
    },
    {
      name: "Gorduras",
      value: Math.round(radix * tfat),
      measure: "g",
    },
    {
      name: "Sódio",
      value: Math.round(radix * sodium),
      measure: "mg",
    },
    {
      name: "Fibras",
      value: Math.round(radix * fiber),
      measure: "g",
    }
  );

  return macros;
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
.food:last-of-type {
  border: none;
}
.form-control {
  border: none !important;
}
input[type="number"] {
  width: 8ch;
}
</style>
