import { Macro } from "./Macro";

export interface Diet extends Macro {
  weight: number;
}

export interface GetDietResponse extends Diet {
  total: Macro;
  available: Macro;
  items: number;
}

export type DietGenStrategy = "weight" | "calories" | "free";
