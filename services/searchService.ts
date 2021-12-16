import { ClassType, LessonType } from "../store/search/types";


export const getClassTypes = (): Promise<ClassType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {

      const classTypes: ClassType[] = [
        {id:"7-sinif", name: "7. Sinif"},
        {id:"8-sinif", name: "8. Sinif"},
      ];
      
      resolve(classTypes);
    }, 300);
  })
};

export const getLessons = (): Promise<LessonType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lessons: LessonType[] = [
        {id:"matematik", name: "Matematik"},
        {id:"fen-ve-teknoloji", name: "Fen ve Teknoloji"},
      ];

      resolve(lessons);
    }, 300);
  })
};