import { Service, Teacher } from "../teacher/types";
import { GradeType } from "../../types/common";

export const mapAlgoliaTeacherHit = (hit: any, services: Service[]): Teacher => {
  const res = {
    ...hit,
    id: hit.objectID,
    numberOfStudents: hit.totalUsers,
    grades: hit.grades.map((g, index) => ({
      id: hit.gradeIds[index],
      name: g,
    } as GradeType)),
    services: [],
    availableServiceTypes: services.filter(s => hit.servicesIds.includes(s.id)),
  } as Teacher;
  return res;
};