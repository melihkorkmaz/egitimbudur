import { createContext, Dispatch, FunctionComponent, useReducer } from "react";
import { Action } from "./actions";
import { defaultState, userStateReducer } from "./reducer";
import { UserState } from "./types";

export const StoreContext = createContext<UserState>(defaultState);
export const DispatchContext = createContext<Dispatch<Action>>(() => null);

type StoreProviderProps = {
  initialState?: UserState,
  children: React.ReactNode
}

export const UserStoreProvider: FunctionComponent<StoreProviderProps> = ({
  initialState = defaultState,
  children
}) => {
  const [state, dispatch] = useReducer(userStateReducer, initialState);

  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
};