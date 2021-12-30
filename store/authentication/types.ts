import { AuthCurrentState, AuthenticatedUser, UserProfile } from "../../types/authentication";

export type AuthenticationState = {
  authState: AuthCurrentState;
  userId?: number;
  user?: AuthenticatedUser,
  userProfile?: UserProfile
};