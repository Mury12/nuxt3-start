import { Macro, MacroMultiplier } from "~~/types";

export function getMacrosCalories(macros: Partial<Macro>) {
  const { carb, tfat, prot } = macros;
  return Math.ceil(
    (carb || 0) * MacroMultiplier.carbohydrates +
      (tfat || 0) * MacroMultiplier.fat +
      (prot || 0) * MacroMultiplier.protein
  );
}
