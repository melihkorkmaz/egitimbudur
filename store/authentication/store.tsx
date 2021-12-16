import { createContext, Dispatch, FunctionComponent, useReducer } from "react"
import { Action } from "./actions";
import { authenticationStateReducer, defaultState } from "./reducer"
import { AuthenticationState } from "./types"

export const StoreContext = createContext<AuthenticationState>(defaultState);
export const DispatchContext = createContext<Dispatch<Action>>(() => {});

type StoreProviderProps = {
  initialState?: AuthenticationState,
  children: React.ReactNode
}

export const AuthenticationStoreProvider: FunctionComponent<StoreProviderProps> = ({
  initialState = defaultState,
  children
}) => {
  const [state, dispatch] = useReducer(authenticationStateReducer, initialState);

  const enchangedDispatch = (action: Action) => {
    if (typeof action === "function") {
      return action(dispatch, state);
    }

    return dispatch(action);
  }

  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={enchangedDispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
};