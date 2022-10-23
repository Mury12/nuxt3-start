import { Axios } from "axios";
import {
  GetAllDietsResponse,
  GetDietResponse,
  DietFilters,
  User,
  GetFoodsResponse,
  GetMealsResponse,
  Auth,
  AuthResponse,
  Diet,
  Food,
  Meal,
} from "~~/types";
import { DefaultPostResponse } from "~~/types/Generic";
import { objectToQueryFilters } from "./object-to-query-params";

const routes = {
  auth: "/user/login",
  user: "/user",
  meal: "/diet/meal",
  meals: "/diet/bulk-meal",
  foods: "/food",
  diet: (filters?: DietFilters) => `/diet${objectToQueryFilters(filters)}`,
  dietStats: (dietId: number) => `/diet/stat/${dietId}`,
};

export class ApiClient {
  constructor(
    private readonly cli = new Axios({
      baseURL: "192.168.123.101:8081/ws/v2",
      withCredentials: true,
    })
  ) {}

  setAuthorization(jwt: string) {
    this.cli.interceptors.request.use((config) => {
      config.headers.Authorization = jwt;
      return config;
    });
  }

  async authenticate(auth: Auth): Promise<AuthResponse> {
    const { data } = await this.cli.post<AuthResponse>(routes.auth, auth);
    this.setAuthorization(data.jwt);
    return data;
  }

  async fetchUser(): Promise<User> {
    const { data } = await this.cli.get<User>(routes.user);
    return data;
  }

  async createUser(user: User): Promise<DefaultPostResponse> {
    const { data } = await this.cli.post<DefaultPostResponse>(
      routes.user,
      user
    );
    return data;
  }

  async fetchAllDiets(): Promise<GetAllDietsResponse> {
    const { data } = await this.cli.get<GetAllDietsResponse>(
      routes.diet({ act: "1" })
    );
    return data;
  }

  async createDiet(diet: Diet): Promise<DefaultPostResponse> {
    const { data } = await this.cli.post<DefaultPostResponse>(
      routes.diet(),
      diet
    );
    return data;
  }

  async fetchDietStats(dietId: number): Promise<GetDietResponse> {
    const { data } = await this.cli.get<GetDietResponse>(
      routes.dietStats(dietId)
    );
    return data;
  }

  async fetchFoods(): Promise<GetFoodsResponse> {
    const { data } = await this.cli.get<GetFoodsResponse>(routes.foods);
    return data;
  }

  async createFood(food: Food): Promise<DefaultPostResponse> {
    const { data } = await this.cli.post<DefaultPostResponse>(
      routes.foods,
      food
    );
    return data;
  }

  async fetchTodayMeals(): Promise<GetMealsResponse> {
    const { data } = await this.cli.get<GetMealsResponse>(routes.meal);
    return data;
  }

  async createMeal(meal: Meal | Meal[]): Promise<DefaultPostResponse> {
    const { data } = await this.cli.post(routes.meals, [meal].flat());
    return data;
  }
}
