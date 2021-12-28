import { AuthCurrentState } from "../../types/authentication";
import { ObjectAction, SET_AUTH_INFO } from "./actions";
import { AuthenticationState } from "./types";

export const defaultState: AuthenticationState = {
  authState: AuthCurrentState.NOT_INITIALIZED,
};

export const authenticationStateReducer = (
  state: AuthenticationState = defaultState,
  action: ObjectAction
): AuthenticationState => {
  switch (action.type) {
    case SET_AUTH_INFO:
      return {
        ...state,
        user: action.payload,
        authState: action.payload ? AuthCurrentState.AUTHENTICATED : AuthCurrentState.NOT_AUTHENTICATED,
      }
    default:
      return state;
  }
};
