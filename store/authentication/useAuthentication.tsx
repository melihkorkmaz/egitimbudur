import { useCallback, useContext } from "react";
import { DispatchContext, StoreContext } from "./store";
import { login } from "./actions"

export const useAuthentication = () => {
  const store = useContext(StoreContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatch = useCallback(useContext(DispatchContext), []);

  return {
    ...store,
    login: (email: string, password: string) => dispatch(login(email, password))
  };
}