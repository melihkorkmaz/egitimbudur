import { useCallback, useContext } from "react";
import { DispatchContext, StoreContext } from "./store";
import { setAuthInfo } from "./actions"
import { useMutation, useLazyQuery } from "@apollo/client";
import { FORGOT_PASSWORD_MUTATION, LOGIN_MUTATION, PASSWORD_RESET_MUTATION, REGISTER_MUTATION } from "../../graphql/mutations";
import { ME } from "../../graphql/queries";
import { AuthenticatedUser, AuthRole, SignUpRequest } from "../../types/authentication";


export const useAuthentication = () => {
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [signUpMutation] = useMutation(REGISTER_MUTATION);
  const [forgotPasswordMutation] = useMutation(FORGOT_PASSWORD_MUTATION);
  const [passwordResetMutation] = useMutation(PASSWORD_RESET_MUTATION);
  const [getUser] = useLazyQuery(ME);
  const store = useContext(StoreContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatch = useCallback(useContext(DispatchContext), []);

  const completeLogin = async (jwt: string) => {
    localStorage.setItem('token', jwt);

    const { data: { me: user } } = await getUser();
    
    const authenticatedUser = {
      ...user,
      role: user.role.type === 'teacher' ? AuthRole.TEACHER : AuthRole.STUDENT
    } as AuthenticatedUser;

    dispatch(setAuthInfo(authenticatedUser));
    
    return authenticatedUser;
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data: { login } } = await loginMutation({
        variables: { email, password },
      });

      
      return completeLogin(login.jwt);
    } catch (error) {
      return {
        message: (error as Error).message
      }
    }
  };

  const handleRegister = async (request: SignUpRequest) => {
    try {
      const { data: { customRegister } } = await signUpMutation({
        variables: {
          email: request.email,
          password: request.password,
          firstName: request.firstName,
          lastName: request.lastName,
          roleName: request.role.toString().toLowerCase(),
          grade: request.grade?.id,
          grades: request.grades?.map(grade => grade.id),
          lessons: request.lessons?.map(lesson => lesson.id)
        }
      });

      return completeLogin(customRegister.jwt);
    } catch (error) {
      return {
        message: (error as Error).message
      }
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      const res = await forgotPasswordMutation({
        variables: { email }
      });
    } catch (error) {
      return {
        message: (error as Error).message
      }
    }
  };

  const handlePasswordReset = async (password: string, code: string) => {
    try {
      const { data: { resetPassword } } = await passwordResetMutation({
        variables: { password, code }
      });

      return completeLogin(resetPassword.jwt);
    } catch (error) {
      return {
        message: (error as Error).message
      }
    }
  };

  return {
    ...store,
    login: handleLogin,
    signUp: handleRegister,
    logout: () => {
      localStorage.removeItem("token");
      dispatch(setAuthInfo());
    },
    forgotPassword: handleForgotPassword,
    passwordReset: handlePasswordReset,
    setAuthInfo: (auth: AuthenticatedUser) => {
      return dispatch(setAuthInfo(auth));
    }
  };
}