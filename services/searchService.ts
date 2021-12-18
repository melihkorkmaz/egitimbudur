import grades from '../dummyData/grades.json';
import lessons from '../dummyData/lessons.json'
import { GradeType, LessonType, SearchFilterType } from '../types/common';
import { TeacherType, UserType } from '../types/user';
import users from '../dummyData/users.json';
import { AuthRole } from '../types/authentication';

export const getGrades = (): Promise<GradeType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(grades);
    }, 300);
  })
};

export const getLessons = (): Promise<LessonType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(lessons);
    }, 300);
  })
};

export const searchTeachers = (filter?: SearchFilterType): Promise<TeacherType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teachers = (users as UserType[]).filter(user => user.role === AuthRole.TEACHER) as TeacherType[];
      resolve(teachers);
    }, 200);
  })
};