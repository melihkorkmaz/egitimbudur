import { AuthRole } from "./authentication"
import { GradeType, LessonType, TeacherServiceCategoryType } from "./common"

export type BaseUserType = {
  id: string,
  profilePhoto?: string,
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
  role: AuthRole;
}

export type StudentType = BaseUserType & {
  grade: GradeType;
}

export type TeacherType = BaseUserType & {
  lessons: LessonType[];
  majors: GradeType[];
  description?: string;
  basePrice: number;
  numberOfStudents: number;
  totalComments: number;
  rating: number;
  services?: TeacherServiceCategoryType[];
}

export type UserType = StudentType | TeacherType;