import { SearchFilterType, TeacherServiceCategoryType } from '../types/common';
import { TeacherType } from '../types/user';
import users from '../dummyData/users.json';
import { AuthRole } from '../types/authentication';
import serviceDummyData from '../dummyData/serviceType.json';

export const getServices = () : Promise<TeacherServiceCategoryType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(serviceDummyData as TeacherServiceCategoryType[]);
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