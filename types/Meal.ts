import { Food } from "./Food";
import { Macro } from "./Macro";

export interface Meal {
  foodId: number;
  qtd: number;
}

export interface MealStats {
  macros: Macro;
  amount: number;
}

export interface MealWithFoodStats {
  stats: MealStats;
  food: Food;
  id?: number;
}

export type GetMealsResponse = MealWithFoodStats[];
