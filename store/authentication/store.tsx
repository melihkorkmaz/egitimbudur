import { useQuery } from "@apollo/client";
import { createContext, Dispatch, FunctionComponent, useEffect, useReducer } from "react"
import {  ME } from "../../graphql/queries";
import { useUserProfile } from "../user/useUserProfile";
import { AuthCurrentState, } from "../../types/authentication";
import { Action, setAuthenticatedUser } from "./actions";
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
  const { getAuthenticatedUser } = useAuthentication();
  const { getUserProfile, setUserProfile, user: userProfile } = useUserProfile();
  const { userId, authState } = state;

  const enchangedDispatch = (action: Action) => {
    if (typeof action === "function") {
      return action(dispatch, state);
    }

    return dispatch(action);
  };

  const initializeAuthentication = async () => {
    const { id, role } = await getAuthenticatedUser();
    
    if (id) {
      dispatch(setAuthenticatedUser(id, role));
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
    if (!userId) {
      return;
    }
    
    const profile = await getUserProfile(userId);
    setUserProfile(profile);
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