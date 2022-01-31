import { createContext, FunctionComponent, useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged, Unsubscribe } from "firebase/auth";

// Services
import { getUserProfileSub } from "./authService";

// Types
import type { AuthenticationState, UserBaseProfile } from "./types";

export const UserContext = createContext<AuthenticationState>({
  isAuthenticated: false,
});

type StoreProviderProps = {
  children: React.ReactNode
}

export const UserProvider: FunctionComponent<StoreProviderProps> = ({
  children
}) => {
  const [state, setState] = useState<AuthenticationState>({
    isAuthenticated: false,
  });

  const userUnsubscription = useRef<Unsubscribe | null>(null);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setState({ isAuthenticated: false });
        return;
      }
      initUserProfile(user.uid);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!userUnsubscription.current) {
      return;
    }
    
    return () => {
      userUnsubscription.current && userUnsubscription.current();
    };
  }, [userUnsubscription])

  const initUserProfile = async (uid: string) => {
    const unsubscribe = await getUserProfileSub(uid, (userProfile) => {
      setState({
        ...state,
        isAuthenticated: true,
        userProfile,
      });
    });

    if (!!unsubscribe) {
      userUnsubscription.current  = unsubscribe;
    }
  };

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  );
};