import { Dispatch } from "react";
import { UserProfile } from "../../types/authentication";
import { UserState } from "./types";

export const SET_USER_PROFILE = "SET_USER_PROFILE";

export const setUserProfile = (user?: UserProfile) => ({
  type: SET_USER_PROFILE,
  payload: user
} as const);

export type ObjectAction = ReturnType<typeof setUserProfile>;

export type Action = ObjectAction;