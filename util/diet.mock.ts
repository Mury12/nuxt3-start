import { GetDietResponse } from "~~/types";

export const dietMock = <GetDietResponse>{
  total: {
    carb: 60,
    prot: 7.5,
    tfat: 2.5,
    calories: 500,
    fiber: 35,
    sodium: 500,
  },
  available: {
    carb: 140,
    prot: 192.5,
    tfat: 57.5,
    calories: 1640,
    fiber: 65,
    sodium: 1500,
  },
  items: 2,
  weight: 85,
  createdAt: new Date("2022-10-11 23:07:02"),
  carb: 200,
  prot: 200,
  tfat: 60,
  fiber: 100,
  sodium: 2000,
  calories: 2140,
  act: 1,
};
