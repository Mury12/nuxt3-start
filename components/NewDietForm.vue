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
        <label for="daily-weight">Peso Inicial</label>
        <BFormInput
          type="text"
          name="weight"
          :v-model="form.weight"
          v-mask="decimalMask"
        />
        <label for="daily-kcal">Calorias ao dia</label>
        <BFormInput
          type="text"
          name="kcal"
          v-mask="decimalMask"
          :v-model="kcal"
          :readonly="/free|weight/gi.test(strategy)"
        />
        <label for="daily-carb">Carboidratos</label>
        <BFormInput
          type="text"
          name="carb"
          v-mask="decimalMask"
          :v-model="form.carb"
          :readonly="/calories|weight/gi.test(strategy)"
        />
        <label for="daily-prot">Proteinas</label>
        <BFormInput
          type="text"
          name="prot"
          v-mask="decimalMask"
          :v-model="form.prot"
          :readonly="/calories|weight/gi.test(strategy)"
        />
        <label for="daily-tfat">Gorduras</label>
        <BFormInput
          type="text"
          name="tfat"
          v-mask="decimalMask"
          :v-model="form.tfat"
          :readonly="/calories|weight/gi.test(strategy)"
        />
        <div class="text-end w-100">
          <BButton type="submit" class="mt-3">Salvar</BButton>
        </div>
      </form>
    </BCol>
    <BCol cols="6">
      <div class="px-2">
        <h2>Instruções:</h2>
        <ol class="guide d-flex flex-column">
          <li>
            Se escolher por peso ou por calorias, insira seu peso e as proteínas
            por quilo (em caso de dúvida, deixe como está).
          </li>

          <li>
            Se escolher inserir macronutrientes, as calorias são calculadas
            automaticamente.
          </li>

          <li>
            Se escolher inserir calorias, os macronutrientes são calculados
            automaticamente.
          </li>
        </ol>
      </div>
    </BCol>
  </BRow>
</template>
<script lang="ts" setup>
import { Diet, DietGenStrategy } from "@/types";
import { decimalMask } from "@/util/decimal-mask";

const kcal = ref(0);
const strategy = ref<DietGenStrategy>("weight");
const form = ref<Diet>({
  carb: 0,
  prot: 0,
  tfat: 0,
  weight: 0,
  sodium: 2000,
  fiber: 100,
  calories: 0,
});

function send() {
  console.log(form);
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
