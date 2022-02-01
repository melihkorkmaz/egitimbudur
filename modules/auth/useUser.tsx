import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

export const useUser = () => {
  const store = useContext(UserContext);

  return {
    ...store,
    logout: () => {
      const auth = getAuth();
      auth.signOut();
    }
  }
}