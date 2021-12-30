import { Dispatch } from "react";
import { AuthCurrentState, AuthenticatedUser, UserProfile } from "../../types/authentication";
import { AuthenticationState } from "./types";

export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const SET_AUTH_STATE = "SET_AUTH_STATE";
export const SET_AUTHENTICATED_USER = "SET_AUTHENTICATED_USER";

export const setUserProfile = (user?: UserProfile) => ({
  type: SET_USER_PROFILE,
  payload: user
} as const);

export const setAuthState = (authState: AuthCurrentState) => ({
  type: SET_AUTH_STATE,
  payload: authState
} as const);

export const setAuthenticatedUser = (user?: AuthenticatedUser) => ({
  type: SET_AUTHENTICATED_USER,
  payload: user
} as const);

export type ObjectAction = ReturnType<typeof setUserProfile | typeof setAuthState | typeof setAuthenticatedUser>;
export type FunctionAction = (
  dispatch: Dispatch<ObjectAction>,
  state?: AuthenticationState
) => void;

export type Action = ObjectAction | FunctionAction;