import type { Grade } from '../common/types';
import type { User, UserBaseProfile } from "../auth/types";
import { AuthRole } from "../auth/types";

export type Student = Pick<User, 'id'> & UserBaseProfile & {
  grade: Grade;
}

export const isStudent = (user: Student | undefined): user is Student => {
  return !!user && user.role === AuthRole.STUDENT;
};