import { AuthCurrentState, AuthenticatedUser } from "../../types/authentication";

export type AuthenticationState = {
  authState: AuthCurrentState;
  user?: AuthenticatedUser
};