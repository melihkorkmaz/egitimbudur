import { createContext, FunctionComponent, useEffect, useMemo, useRef, useState } from "react"
import { getAuth, onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { UserProfile } from "../types/user";
import { getUserProfileSub } from "../services/userService";

interface AuthenticationState {
  isAuthenticated: boolean;
  userProfile?: UserProfile;
};

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
    
    const unsub = await getUserProfileSub(uid, (user) => {
      setState({
        ...state,
        isAuthenticated: true,
        userProfile: user,
      });
    });

    if (!!unsub) {
      userUnsubscription.current  = unsub;
    }
  };

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  );
};