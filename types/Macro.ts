export interface Macro {
  carb: number;
  prot: number;
  tfat: number;
  calories: number;
  fiber: number;
  sodium: number;
}

export interface MacroField {
  name: string;
  value: number;
  measure?: "g" | "mg";
}

export enum MacroMultiplier {
  "carbohydrates" = 4,
  "protein" = 4,
  "fat" = 9,
}
