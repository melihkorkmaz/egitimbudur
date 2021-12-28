import { Dispatch } from "react";
import { AuthenticatedUser } from "../../types/authentication";
import { AuthenticationState } from "./types";

export const SET_AUTH_INFO = "SET_AUTH_INFO";

export const setAuthInfo = (auth?: AuthenticatedUser) => ({
  type: SET_AUTH_INFO,
  payload: auth
} as const);

export type ObjectAction = ReturnType<typeof setAuthInfo>;
export type FunctionAction = (
  dispatch: Dispatch<ObjectAction>,
  state?: AuthenticationState
) => void;

export type Action = ObjectAction | FunctionAction;