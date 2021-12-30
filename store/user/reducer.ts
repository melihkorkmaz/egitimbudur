import { ObjectAction, SET_USER_PROFILE } from "./actions";
import { UserState } from "./types";

export const defaultState: UserState = {};

export const userStateReducer = (
  state: UserState = defaultState,
  action: ObjectAction
): UserState => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
};
