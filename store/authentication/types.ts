import { AuthCurrentState, AuthRole } from "../../types/authentication";



export type AuthenticationState = {
  authState: AuthCurrentState;
  loginError?: string;
  userId?: string;
  token?: string;
  authRole?: AuthRole;
};