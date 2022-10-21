import { GetMealsResponse } from "~~/types";

export const mealsMock = <GetMealsResponse>[
  {
    stats: {
      macros: {
        carb: 36,
        prot: 4.5,
        tfat: 1.5,
        calories: 300,
        fiber: 1.5,
        sodium: 300,
      },
      amount: 3,
    },
    food: {
      id: 1,
      name: "Pão Integral",
      weight: 2,
      carb: 24,
      prot: 3,
      tfat: 1,
      fiber: 1,
      sodium: 200,
      calories: 200,
      unit: "g",
    },
    id: 1,
  },
  {
    stats: {
      macros: {
        carb: 36,
        prot: 4.5,
        tfat: 1.5,
        calories: 300,
        fiber: 1.5,
        sodium: 300,
      },
      amount: 3,
    },
    food: {
      id: 1,
      name: "Pão Integral",
      weight: 2,
      carb: 24,
      prot: 3,
      tfat: 1,
      fiber: 1,
      sodium: 200,
      calories: 200,
      unit: "g",
    },
    id: 2,
  },
  {
    stats: {
      macros: {
        carb: 24,
        prot: 3,
        tfat: 1,
        calories: 200,
        fiber: 1,
        sodium: 200,
      },
      amount: 2,
    },
    food: {
      id: 1,
      name: "Pão Integral",
      weight: 2,
      carb: 24,
      prot: 3,
      tfat: 1,
      fiber: 1,
      sodium: 200,
      calories: 200,
      unit: "g",
    },
    id: 3,
  },
];
