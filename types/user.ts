import { AuthRole } from "./authentication"
import { GradeType, LessonType, TeacherServiceCategoryType } from "./common"

export type UserType = {
  id: string,
  profilePhoto?: string,
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
  role: AuthRole;
}

export type TeacherType = UserType & {
  lessons: LessonType[];
  majors: GradeType[];
  description?: string;
  basePrice: number;
  numberOfStudents: number;
  totalComments: number;
  rating: number;
  services?: TeacherServiceCategoryType[];
}