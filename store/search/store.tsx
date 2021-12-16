import { createContext, Dispatch, FunctionComponent, useEffect, useReducer } from "react";
import { Action } from "./actions";
import { defaultState, searchStateReducer } from "./reducer";
import { SearchState, StoreProviderProps } from "./types";

export const StoreContext = createContext<SearchState>(defaultState);
export const DispatchContext = createContext<Dispatch<Action>>(() => null);

export const SearchStoreProvider: FunctionComponent<StoreProviderProps> = ({
  initialState = defaultState,
  children,
}) => {
  
  const [state, dispatch] = useReducer(searchStateReducer, initialState);

  const enhancedDispatch = (action: Action) => {
    if (typeof action === 'function') {
      return action(dispatch, state);
    }

    return dispatch(action);
  };

  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={enhancedDispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
}