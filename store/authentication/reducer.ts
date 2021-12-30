import { AuthCurrentState } from "../../types/authentication";
import { ObjectAction, SET_AUTHENTICATED_USER, SET_AUTH_STATE } from "./actions";
import { AuthenticationState } from "./types";

export const defaultState: AuthenticationState = {
  authState: AuthCurrentState.NOT_INITIALIZED,
};

export const authenticationStateReducer = (
  state: AuthenticationState = defaultState,
  action: ObjectAction
): AuthenticationState => {
  switch (action.type) {
    case SET_AUTH_STATE:
      return {
        ...state,
        authState: action.payload,
      }
    case SET_AUTHENTICATED_USER: {
      return {
        ...state,
        userId: action.payload.id,
        role: action.payload.role,
        authState: action.payload ? AuthCurrentState.AUTHENTICATED : AuthCurrentState.NOT_AUTHENTICATED
      }
    }
    default:
      return state;
  }
};
