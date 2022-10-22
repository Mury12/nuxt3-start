import { DietStats, Macro, MacroField } from "~~/types";

export function getDietAfterMeal(
  diet: DietStats,
  totalMacros: Macro
): MacroField[] {
  return <MacroField[]>[
    {
      name: "Calorias",
      value: diet.calories - totalMacros.calories,
    },
    {
      name: "Carboidratos",
      value: diet.carb - totalMacros.carb,
      measure: "g",
    },
    {
      name: "Proteinas",
      value: diet.prot - totalMacros.prot,
      measure: "g",
    },
    {
      name: "Gorduras",
      value: diet.tfat - totalMacros.tfat,
      measure: "g",
    },
    {
      name: "Sódio",
      value: diet.sodium - totalMacros.sodium,
      measure: "mg",
    },
    {
      name: "Fibras",
      value: diet.fibers - totalMacros.fiber,
      measure: "g",
    },
  ];
}
