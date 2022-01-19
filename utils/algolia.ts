import { GradeType, TeacherServiceCategoryType } from "../types/common";
import { Teacher } from "../types/user";

export const mapAlgoliaTeacherHit = (hit: any): Teacher => {
  const res = {
    ...hit,
    id: hit.objectID,
    numberOfStudents: hit.totalUsers,
    grades: hit.grades.map((g, index) => ({
      id: hit.gradeIds[index],
      name: g,
    } as GradeType)),
    services: hit.services.map((s, index) => ({
      id: hit.servicesIds[index],
      name: s,
    } as TeacherServiceCategoryType)),
  } as Teacher;
  return res;
};