import { Dispatch } from "react";
import { AuthCurrentState, AuthRole} from "../../types/authentication";
import { AuthenticationState } from "./types";

export const SET_AUTH_STATE = "SET_AUTH_STATE";
export const SET_AUTHENTICATED_USER = "SET_AUTHENTICATED_USER";

export const setAuthState = (authState: AuthCurrentState) => ({
  type: SET_AUTH_STATE,
  payload: authState
} as const);

export const setAuthenticatedUser = (id?: number, role?: AuthRole) => ({
  type: SET_AUTHENTICATED_USER,
  payload: { id, role }
} as const);

export type ObjectAction = ReturnType<typeof setAuthState | typeof setAuthenticatedUser>;
export type FunctionAction = (
  dispatch: Dispatch<ObjectAction>,
  state?: AuthenticationState
) => void;

export type Action = ObjectAction | FunctionAction;