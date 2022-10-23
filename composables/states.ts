import {
  GetDietResponse,
  GetFoodsResponse,
  GetMealsResponse,
  MacroDistribution,
  MacroMultiplier,
  User,
} from "@/types";

import { dietMock } from "~~/util/diet.mock";
import { foodsMock } from "~~/util/foods.mock";
import { mealsMock } from "~~/util/meals.mock";
import { userMock } from "~~/util/user.mock";

export const useCounter = () => useState<number>("counter", () => 0);

export const useLayout = () =>
  useState<"default" | "custom">("layout", () => "default");

export const useComputedDiet = () =>
  useState("diet", (): GetDietResponse => dietMock);

export const useComputedFoods = () =>
  useState("foods", (): GetFoodsResponse => foodsMock);

export const useComputedMeals = () =>
  useState("meals", (): GetMealsResponse => mealsMock);

export const useComputedUser = () => useState("user", (): User => userMock);

export const useMacroDistribution = () =>
  useState(
    "macro-dist",
    (): MacroDistribution => ({
      carb: 0.45 / MacroMultiplier.carbohydrates,
      tfat: 0.25 / MacroMultiplier.fat,
      prot: 0.3 / MacroMultiplier.protein,
    })
  );
