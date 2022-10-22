import {
  GetDietResponse,
  GetFoodsResponse,
  GetMealsResponse,
  User,
} from "@/types";

import dietMock from "@/util/diet.mock.json";
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
