import { Macro } from "./Macro";

export interface Diet extends Macro {
  id?: number;
  weight: number;
  createdAt?: Date;
  act?: 0 | 1;
}

export type GetAllDietsResponse = Diet[];

export interface GetDietResponse extends Diet {
  total: Macro;
  available: Macro;
  items: number;
}

export enum StrategyMult {
  gain = 37 * 0.85,
  keep = 33 * 0.85,
  loss = 29 * 0.85,
}

export interface MacroDistribution {
  carb: number;
  tfat: number;
  prot: number;
}

export type DietFilters = Partial<Record<keyof Diet, string>>;
export type DietGenStrategy = "weight" | "calories" | "free";
