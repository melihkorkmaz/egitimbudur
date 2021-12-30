import { useQuery } from "@apollo/client";
import { createContext, Dispatch, FunctionComponent, useEffect, useReducer } from "react"
import {  ME } from "../../graphql/queries";
import { AuthCurrentState, } from "../../types/authentication";
import { Action, setAuthenticatedUser, setUserProfile } from "./actions";
import { authenticationStateReducer, defaultState } from "./reducer"
import { AuthenticationState } from "./types"
import { useAuthentication } from "./useAuthentication";

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
  const { getUserProfile, getAuthenticatedUser } = useAuthentication();
  const { user, userProfile, authState } = state;

  const enchangedDispatch = (action: Action) => {
    if (typeof action === "function") {
      return action(dispatch, state);
    }

    return dispatch(action);
  };

  const initializeAuthentication = async () => {
    const authenticatedUser = await getAuthenticatedUser();

    if (authenticatedUser) {
      dispatch(setAuthenticatedUser(authenticatedUser));
      return;
    }
      
    localStorage.removeItem("token");      
    dispatch(setAuthenticatedUser());

  }

  useEffect(() => {
    if (authState === AuthCurrentState.NOT_INITIALIZED) {
      initializeAuthentication();
    }

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState])


  const initUserProfile = async () => {
    if (!user) {
      return;
    }
    
    const profile = await getUserProfile(user.id);
    dispatch(setUserProfile(profile));
  }

  useEffect(() => {
    if (authState === AuthCurrentState.AUTHENTICATED && userProfile === undefined) {
      initUserProfile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, userProfile]);


  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={enchangedDispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
};