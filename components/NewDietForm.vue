<template>
  <BRow class="new-diet-form my-3 rounded">
    <BCol cols="12" md="6">
      <form @submit.prevent="send" class="form-control">
        <label for="daily-weight">Peso Inicial</label>
        <BFormInput
          type="text"
          name="weight"
          :value="form.weight"
          :v-mask="['#####']"
        />
        <label for="daily-kcal">Calorias ao dia</label>
        <BFormInput type="text" name="kcal" :value="kcal" :mask="['#####']" />
        <label for="daily-carb">Carboidratos</label>
        <BFormInput
          type="text"
          name="carb"
          :value="form.carb"
          :v-mask="['#####']"
        />
        <label for="daily-prot">Proteinas</label>
        <BFormInput
          type="text"
          name="prot"
          :value="form.prot"
          :v-mask="['#####']"
        />
        <label for="daily-tfat">Gorduras</label>
        <BFormInput
          type="text"
          name="tfat"
          :value="form.tfat"
          :v-mask="['#####']"
        />
        <div class="text-end w-100">
          <BButton type="submit" variant="success" class="mt-3">Salvar</BButton>
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
<script lang="ts">
import { defineComponent } from "vue";
import { Diet } from "@/types";

export default defineComponent({
  setup() {
    const kcal = ref(0);
    const form = ref<Diet>({
      carb: 0,
      prot: 0,
      tfat: 0,
      weight: 0,
    });

    function send() {
      console.log(form);
    }

    return { form, kcal, send };
  },
});
</script>

<style scoped>
.new-diet-form {
  text-align: left;
}

.guide {
  row-gap: 1em;
}
</style>
