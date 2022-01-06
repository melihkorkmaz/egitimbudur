import { AuthRole } from "./authentication"
import { GradeType, LessonType, TeacherServiceCategoryType } from "./common"


// email,
//       password,
//       firstName,
//       lastName,
//       role,
//       grade: grades.find(c => c.id === selectedGrade),
//       lessons: lessonsListItems.filter(l => l.selected).map(l => l.lesson),
//       grades: gradesListItems.filter(l => l.selected).map(l => l.grade)

type User = {
  id: string;
  email: string;
  password: string;
}

type UserBaseProfile = {
  firstName: string;
  lastName: string;
  role: AuthRole;
  photo?: string;
}

type Student = Pick<User, 'id'> & UserBaseProfile & {
  grade: GradeType;
}

export type Teacher = Pick<User, 'id'> & UserBaseProfile & {
  grades: GradeType[];
  lessons: LessonType[];
  description?: string;
  zoomLink?: string;
  skypeUserName?: string;
  about?: string;
  services?: TeacherServiceCategoryType[];
}

export type CreateTeacherRequest = Omit<User, 'id'> & UserBaseProfile & Pick<Teacher, 'grades' | 'lessons'>;
export type CreateStudentRequest = Omit<User, 'id'> & UserBaseProfile & Pick<Student, 'grade'>;
export type CreateUserRequest = CreateTeacherRequest | CreateStudentRequest;

export type UserProfile = Student | Teacher;

export const isTeacher = (user: UserProfile | undefined): user is Teacher => {
  return !!user && user.role === AuthRole.TEACHER;
};

export const isCreateTeacherRequest = (request: CreateUserRequest): request is CreateTeacherRequest => {
    return request.role === AuthRole.TEACHER;
}