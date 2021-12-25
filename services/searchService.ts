import { GradeType, LessonType, SearchFilterType, TeacherServiceCategoryType } from '../types/common';
import { TeacherType, UserType } from '../types/user';
import users from '../dummyData/users.json';
import { AuthRole } from '../types/authentication';
import client from '../graphql/apollo-client';
import serviceDummyData from '../dummyData/serviceType.json';
import { GRADES_QUERY, LESSONS_QUERY } from '../graphql/queries';

export const getGrades = async (): Promise<GradeType[]> => {
  const { data } = await client.query({
    query: GRADES_QUERY
  });

  return data.grades.data.map(g => ({
    id: g.id,
    name: g.attributes.Name,
    order: g.attributes.Order
  }));
};

export const getLessons = async (): Promise<LessonType[]> => {
  const { data } = await client.query({
    query: LESSONS_QUERY
  });

  return data.lessons.data.map(g => ({
    id: g.id,
    name: g.attributes.Name,
    order: g.attributes.Order
  }));
};

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