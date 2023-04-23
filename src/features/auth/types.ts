export type Roles = "admin" | "user" | "staff";

export interface User {
  id: string;
  email: string;
  role: Roles;
}

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: any | null;
};
