import { AuthRole } from "./authentication"
import { GradeType, LessonType, TeacherServiceCategoryType } from "./common"

export type BaseUserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photo?: string;
}

export type StudentType = BaseUserType & {
  grade: string;
};

export type TeacherType = BaseUserType & {
  description?: string;
  zoomLink?: string;
  skypeUserName?: string;
  about?: string;
  grades?: string[];
  lessons?: string[];
  services?: TeacherServiceCategoryType[];
};

export type UserProfile = StudentType | TeacherType;