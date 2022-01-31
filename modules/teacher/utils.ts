import { TeacherService } from "./types";

export const getBasePrice = (services?: TeacherService[]): number => {
  if (!services){
    return 0;
  };

  return Math.min(...services.map((s: TeacherService) => s.price));
};