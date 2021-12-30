import { GradeType, LessonType } from "./common";

export enum AuthRole {
  TEACHER = 'teacher',
  STUDENT = 'student'
}

export enum AuthCurrentState {
  NOT_INITIALIZED = 'NOT_INITIALIZED',
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
  AUTHENTICATED = 'AUTHENTICATED'
}

export type SignUpRequest = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: AuthRole,
  grade?: GradeType,
  lessons?: LessonType[]
  grades?: GradeType[]
};


export type MeResponse = {
  id: number;
  role: AuthRole;
};

export type AuthErrorType = {
  message: string;
}
