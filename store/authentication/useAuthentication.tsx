import { useCallback, useContext } from "react";
import { DispatchContext, StoreContext } from "./store";
import { setUserProfile, setAuthState, setAuthenticatedUser } from "./actions"
import { useMutation, useLazyQuery } from "@apollo/client";
import { FORGOT_PASSWORD_MUTATION, LOGIN_MUTATION, PASSWORD_RESET_MUTATION, REGISTER_MUTATION } from "../../graphql/mutations";
import { GET_USER, ME } from "../../graphql/queries";
import { AuthCurrentState, AuthenticatedUser, AuthRole, SignUpRequest, UserProfile } from "../../types/authentication";


export const useAuthentication = () => {
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [signUpMutation] = useMutation(REGISTER_MUTATION);
  const [forgotPasswordMutation] = useMutation(FORGOT_PASSWORD_MUTATION);
  const [passwordResetMutation] = useMutation(PASSWORD_RESET_MUTATION);
  const [getUser] = useLazyQuery(GET_USER);
  const [getMe] = useLazyQuery(ME);
  const store = useContext(StoreContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatch = useCallback(useContext(DispatchContext), []);

  const getUserProfile = async (userId: string): Promise<UserProfile> => {
    const {
      data: {
        usersPermissionsUser: {
          data
        }
      }
    } = await getUser({
      variables: {
        id: userId
      }
    });

    console.log("data", data);
    return {
      id: userId,
      ...data?.attributes,
      photo: data?.attributes?.photo?.data?.attributes?.url,
    } as UserProfile;

  }

  const getAuthenticatedUser = async (): Promise<AuthenticatedUser> => {
    const { data: {
      me: user
    } } = await getMe();
    return {
      id: user.id,
      role: user.role.type === 'teacher' ? AuthRole.TEACHER : AuthRole.STUDENT,
    };
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data: { login: { jwt, user } } } = await loginMutation({
        variables: { email, password },
      });

      localStorage.setItem('token', jwt);
      return getAuthenticatedUser();
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
      localStorage.setItem('token', customRegister.jwt);
      return getAuthenticatedUser();
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

      localStorage.setItem('token', resetPassword.jwt);
      return getAuthenticatedUser();
    } catch (error) {
      return {
        message: (error as Error).message
      }
    }
  };

  return {
    ...store,
    getUserProfile,
    getAuthenticatedUser,
    setUserProfile: (user: UserProfile) => dispatch(setUserProfile(user)),
    setAuthenticatedUser: (user: AuthenticatedUser) => dispatch(setAuthenticatedUser(user)),
    setAuthState: (authState: AuthCurrentState) => dispatch(setAuthState(authState)),
    login: handleLogin,
    signUp: handleRegister,
    logout: () => {
      localStorage.removeItem("token");
      dispatch(setUserProfile());
      dispatch(setAuthenticatedUser());
      dispatch(setAuthState(AuthCurrentState.NOT_AUTHENTICATED));
    },
    forgotPassword: handleForgotPassword,
    passwordReset: handlePasswordReset
  };
}