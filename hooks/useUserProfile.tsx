import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../modules/auth/UserProvider";
import { Teacher } from "../types/user";

export const useUserProfile = () => {
  const store = useContext(UserContext);

  return {
    ...store,
    teacher: store.userProfile as Teacher,
    logout: () => {
      const auth = getAuth();
      auth.signOut();
    }
  }
}