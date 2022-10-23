import { Macro } from "./Macro";

export interface Diet extends Macro {
  weight: number;
  createdAt?: Date;
}

export interface GetDietResponse extends Diet {
  total: Macro;
  available: Macro;
  items: number;
}

export type DietGenStrategy = "weight" | "calories" | "free";

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
