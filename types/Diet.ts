export interface Diet {
  weight: number;
  carb: number;
  prot: number;
  tfat: number;
}

export interface DietStats {
  carb: number;
  prot: number;
  tfat: number;
  calories: number;
  fibers: number;
  sodium: number;
}

export interface GetDietResponse extends Diet {
  total: DietStats;
  available: DietStats;
  items: number;
  calories: number;
}
