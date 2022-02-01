import { Student } from "../student/types";
import { Teacher } from "../teacher/types";

export enum AuthRole {
  TEACHER = 'teacher',
  STUDENT = 'student'
};

export type AuthErrorType = {
  message: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: AuthRole;
  photo?: string;
};

type CreateUserRequest = Omit<User, 'id'> & {
  email: string;
  password: string;
}

export type CreateTeacherRequest = CreateUserRequest & Pick<Teacher, 'grades' | 'lessons'>;
export type CreateStudentRequest = CreateUserRequest & Pick<Student, 'grade'>;

export const isCreateTeacherRequest = (request: CreateTeacherRequest | CreateStudentRequest): request is CreateTeacherRequest => {
    return request.role === AuthRole.TEACHER;
};

export type AuthenticationState = {
  isAuthenticated: boolean;
  user?:  User;
};