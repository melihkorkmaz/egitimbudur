import { GradeType } from "../../types/common";
import { User, UserBaseProfile } from "../common/types";

export type Student = Pick<User, 'id'> & UserBaseProfile & {
  grade: GradeType;
}
