import { AuthCurrentState, AuthRole } from "../../types/authentication";



export type AuthenticationState = {
  authState: AuthCurrentState;
  loginError?: string;
  jwt?: string;
  user?: {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: AuthRole;
  }
};