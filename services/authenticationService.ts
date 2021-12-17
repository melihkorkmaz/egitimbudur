import { AuthRole } from "../store/authentication/types";
import { GradeType, LessonType } from "../store/search/types";

export type AuthType = {
  userId: string;
  token: string;
};

export type AuthErrorType = {
  message: string;
}

export const loginByEmailAndPassword = (email: string, password: string): Promise<AuthType | AuthErrorType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userId: "fake-id",
        token: "fake-token"
      })
      // resolve({
      //   message: "Email or password is incorrect"
      // } as AuthErrorType);
    }, 200)
  })
}

export type SignUpRequest = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: AuthRole,
  className?: GradeType,
  lessons?: LessonType[]
};
export const signUpByEmailAndPassword = (request: SignUpRequest): Promise<boolean | AuthErrorType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Register
      resolve(true);
      // resolve({
      //   message: "Bu email adresi kayitli"
      // } as AuthErrorType);
    }, 100);
  })
}

export const resetPassword = (email: string): Promise<boolean | AuthErrorType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Bu email adresi sistemde kayitli degil"
      });
    }, 200);
  });
}