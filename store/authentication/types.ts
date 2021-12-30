import { AuthCurrentState, AuthRole } from "../../types/authentication";

export interface AuthenticationState {
  authState: AuthCurrentState;
  userId?: number;
  role?: AuthRole;
};