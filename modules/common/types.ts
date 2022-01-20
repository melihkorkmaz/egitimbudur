import { AuthRole } from "./enums"

export type User = {
  id: string;
  email: string;
  password: string;
}

export type UserBaseProfile = {
  firstName: string;
  lastName: string;
  role: AuthRole;
  photo?: string;
}

export type Grade = {
  name: string;
  id: string;
}

export type Lesson = {
  name: string;
  id: string;
}

