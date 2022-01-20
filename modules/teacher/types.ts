import { Grade, Lesson, User, UserBaseProfile } from "../common/types";
import { ServiceType } from "./enums";

export type Service = {
  id: string;
  name: string;
  type: ServiceType;
};

export type Teacher = Pick<User, 'id'> & UserBaseProfile & {
  grades: Grade[];
  lessons: Lesson[];
  description?: string;
  zoomLink?: string;
  skypeUserName?: string;
  about?: string;
  services?: Service[];
  totalComments?: number;
  rating?: number;
  numberOfStudents?: number;
  basePrice?: number;
};