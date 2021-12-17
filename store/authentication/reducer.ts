import { AuthCurrentState } from "../../types/authentication";
import { ObjectAction, SET_AUTH_INFO, SET_LOGIN_STATE } from "./actions";
import { AuthenticationState } from "./types";

export const defaultState: AuthenticationState = {
  authState: AuthCurrentState.NOT_INITIALIZED,
};

export const authenticationStateReducer = (
  state: AuthenticationState = defaultState,
  action: ObjectAction
): AuthenticationState => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        authState: action.payload.authState,
        loginError: action.payload.error,
      };
    case SET_AUTH_INFO:
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
      }
    default:
      return state;
  }
};
