import { ObjectAction, SET_CLASS_TYPES, SET_LESSONS } from "./actions"
import { SearchState } from "./types"

export const defaultState: SearchState = {} as SearchState;

export const searchStateReducer  = (
  state: SearchState = defaultState,
  action: ObjectAction
): SearchState => {

  switch (action.type) {  
    case SET_CLASS_TYPES:
      return {
        ...state,
        classes: action.payload
      }
    case SET_LESSONS:
      return {
        ...state,
        lessons: action.payload
      }
    default:
      return state;
  }
}