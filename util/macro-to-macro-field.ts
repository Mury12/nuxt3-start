import { Macro, MacroField } from "~~/types";

export function macroToMacroField(macro: Macro): MacroField[] {
  return <MacroField[]>[
    {
      name: "Calorias",
      value: macro.calories,
    },
    {
      name: "Carboidratos",
      value: macro.carb,
      measure: "g",
    },
    {
      name: "Proteinas",
      value: macro.prot,
      measure: "g",
    },
    {
      name: "Gorduras",
      value: macro.tfat,
      measure: "g",
    },
    {
      name: "Sódio",
      value: macro.sodium,
      measure: "mg",
    },
    {
      name: "Fibras",
      value: macro.fiber,
      measure: "g",
    },
  ];
}
