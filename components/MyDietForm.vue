<template>
  <BRow class="new-diet-form my-3 rounded">
    <BCol cols="12">
      <table class="table table-responsive table-hover table-stripped">
        <thead>
          <th scope="col">Macros</th>
          <th scope="col">Consumido</th>
          <th scope="col">Restante</th>
          <th scope="col">Total</th>
        </thead>
        <tr>
          <td>Calorias</td>
          <td>{{ diet.total.calories }}Kcal</td>
          <td>{{ diet.available.calories }}Kcal</td>
          <td>{{ diet.calories }}Kcal</td>
        </tr>
        <tr>
          <td>Carboidratos</td>
          <td>{{ diet.total.carb }}g</td>
          <td>{{ diet.available.carb }}g</td>
          <td>{{ diet.carb }}g</td>
        </tr>
        <tr>
          <td>Proteinas</td>
          <td>{{ diet.total.prot }}g</td>
          <td>{{ diet.available.prot }}g</td>
          <td>{{ diet.prot }}g</td>
        </tr>
        <tr>
          <td>Gorduras</td>
          <td>{{ diet.total.tfat }}g</td>
          <td>{{ diet.available.tfat }}g</td>
          <td>{{ diet.tfat }}g</td>
        </tr>
        <tr>
          <td>Sódio</td>
          <td>{{ diet.total.sodium }}mg</td>
          <td>{{ 2000 - diet.total.sodium }}mg</td>
          <td>~2000mg</td>
        </tr>
        <tr>
          <td>Fibras</td>
          <td>{{ diet.total.fibers }}mg</td>
          <td>{{ 100 - diet.total.fibers }}mg</td>
          <td>~100mg</td>
        </tr>
      </table>
      <h6>Total de refeições: {{ diet.items }}</h6>
    </BCol>
    <BRow :style="{ gap: '10px' }">
      <BCol
        v-for="(meal, idx) in meals"
        :key="idx"
        class="border rounded bg-brand-secondary shadow-sm pointer hover"
      >
        {{ meal.food.name }} - x{{ meal.stats.amount }}<br />
        {{ meal.stats.macros.cal }}Kcal
      </BCol>
    </BRow>
  </BRow>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { GetDietResponse, GetMealsResponse } from "@/types";
import dietMock from "@/util/diet.mock.json";
import { mealsMock } from "@/util/meals.mock";

export default defineComponent({
  setup() {
    const diet = ref<GetDietResponse>(dietMock);
    const meals = ref<GetMealsResponse>(mealsMock);
    return { diet, meals };
  },
});
</script>
<style scoped>
.table-hover tr:hover {
  user-select: none;
  background-color: rgba(0, 0, 0, 0.125);
}

.table-stripped tr:nth-of-type(2n + 1) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
