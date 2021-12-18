import { GradeType, LessonType } from "../../types/common";



export type SearchState = {
  classes: GradeType[];
  lessons: LessonType[];
};

export type StoreProviderProps = {
  initialState?: SearchState;
}