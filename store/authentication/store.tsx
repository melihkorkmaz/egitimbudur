import { useQuery } from "@apollo/client";
import { createContext, Dispatch, FunctionComponent, useEffect, useReducer } from "react"
import { ME } from "../../graphql/queries";
import { AuthenticatedUser, AuthRole } from "../../types/authentication";
import { Action, setAuthInfo } from "./actions";
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
  const { loading, error, data } = useQuery(ME);

  const enchangedDispatch = (action: Action) => {
    if (typeof action === "function") {
      return action(dispatch, state);
    }

    return dispatch(action);
  };

  useEffect(() => {
    if (loading) {
      return;
    }

    if (data && data.me) {
      const auth = {
        ...data.me,
        role: data.me.role.type === 'teacher' ? AuthRole.TEACHER : AuthRole.STUDENT
       } as AuthenticatedUser;

      dispatch(setAuthInfo(auth));      

      return;
    } else if (error) {
      localStorage.removeItem("token");
      dispatch(setAuthInfo());
    }
  }, [loading, error, data])

  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={enchangedDispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
};