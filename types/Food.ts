import { Macro } from "./Macro";

export interface Food extends Macro {
  id?: number;
  name: string;
  weight: number;
  unit: string;
}

export type GetFoodsResponse = Food[];
