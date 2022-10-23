<template>
  <code v-if="strategy === 'weight'">
    O modo "Por peso", calcula automaticamente os macronutrientes diários para
    seu consumo, de acordo com a estratégia selecionada, de um déficit leve a
    mais agressivo. Para calcular corretamente, digite seu peso inicial e o peso
    o qual deseja alcançar.
  </code>
  <code v-else-if="strategy === 'calories'">
    O modo "Calorias", calcula os macronutrientes diários de acordo com os seus
    objetivos calóricos totais, portanto, digite a quantidade de calorias
    desejadas para que os macronutrientes sejam calculados automaticamente.
  </code>
  <code v-else>
    O modo "Manual", calcula as calorias diárias de acordo com as entradas de
    macronutrientes inserida. Este tipo de cálculo é destinado a aqueles que já
    possuem experiência e gostariam de definir macronutrientes por si mesmos.
  </code>
</template>
<script lang="ts" setup >
import { DietGenStrategy } from "~~/types";
const { strategy } = defineProps<{
  strategy: DietGenStrategy;
}>();
</script>
