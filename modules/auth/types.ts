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
  email: string;
  password: string;
};

export type UserBaseProfile = {
  firstName: string;
  lastName: string;
  role: AuthRole;
  photo?: string;
};

export type CreateTeacherRequest = Omit<User, 'id'> & UserBaseProfile & Pick<Teacher, 'grades' | 'lessons'>;
export type CreateStudentRequest = Omit<User, 'id'> & UserBaseProfile & Pick<Student, 'grade'>;

export const isCreateTeacherRequest = (request: CreateTeacherRequest | CreateStudentRequest): request is CreateTeacherRequest => {
    return request.role === AuthRole.TEACHER;
};

export type AuthenticationState = {
  isAuthenticated: boolean;
  userProfile?: UserBaseProfile;
};