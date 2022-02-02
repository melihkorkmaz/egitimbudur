import { AuthRole, User } from "../auth/types";
import { Grade, Lesson } from "../common/types";
import { ServiceType } from "./enums";

export type Service = {
  id: string;
  name: string;
  type: ServiceType;
};

export type TeacherService = {
  id: string;
  duration: number;
  price: number;
  service: Service;
}

export type TeacherServiceDTO = Omit<TeacherService, "service"> & {
  typeId: string;
  typeName: string;
}

export type TeacherDTO = Pick<User, 'id'> & User & {
  grades: Grade[];
  lessons: Lesson[];
  description?: string;
  zoomLink?: string;
  skypeUserName?: string;
  about?: string;
  totalComments?: number;
  numberOfStudents?: number;
  rating?: number;
}

export type Teacher = TeacherDTO & {
  basePrice: number;
  services: TeacherService[];
  availableServiceTypes: Service[];
  comments: CommentType[];
};


export type UserWithPhoto = {
  id: string;
  photo: string;
  firstName: string;
  lastName: string;
}

export type CommentType = {
  id: string;
  owner: UserWithPhoto;
  comment: string;
  likes: number;
  dislikes: number;
  dateCommented: number;
}

export const isTeacher = (user: Teacher | User): user is Teacher => {
  return !!user && user.role === AuthRole.TEACHER;
};