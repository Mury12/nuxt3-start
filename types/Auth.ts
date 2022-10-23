export interface Auth {
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  name?: string;
}
