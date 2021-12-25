import { Dispatch } from "react";
import { AuthenticationState } from "./types";
import { AuthErrorType, AuthType, loginByEmailAndPassword} from '../../services/authenticationService';
import { AuthCurrentState } from "../../types/authentication";

export const SET_LOGIN_STATE = "SET_LOGIN_STATE";
export const SET_AUTH_INFO = "SET_AUTH_INFO";

const setLoginState = (authState: AuthCurrentState, error?: string) => ({
  type: SET_LOGIN_STATE,
  payload: {
    authState,
    error
  }
} as const);

export const setAuthInfo = (auth: AuthType) => ({
  type: SET_AUTH_INFO,
  payload: auth
} as const);

export const login = (email: string, password: string): FunctionAction => 
async (dispatch: Dispatch<ObjectAction>)  => {
  const response = await loginByEmailAndPassword(email, password);

  if ((response as AuthErrorType).message) {
    return dispatch(setLoginState(AuthCurrentState.FAILED, (response as AuthErrorType).message));
  }
  console.log("response", response);
  dispatch(setAuthInfo(response as AuthType));
  dispatch(setLoginState(AuthCurrentState.AUTHENTICATED));
};


export type ObjectAction = ReturnType<typeof setLoginState | typeof setAuthInfo>;
export type FunctionAction = (
  dispatch: Dispatch<ObjectAction>,
  state?: AuthenticationState
) => void;

export type Action = ObjectAction | FunctionAction;