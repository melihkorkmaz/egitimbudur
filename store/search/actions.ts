import { ClassType, LessonType, SearchState } from "./types";

export const SET_CLASS_TYPES = 'SET_CLASS_TYPES';
export const SET_LESSONS = 'SET_LESSONS';

export const setClassTypes = (classTypes: ClassType[]) => ({
  type: SET_CLASS_TYPES,
  payload: classTypes
});

export const setLessons = (lessons: LessonType[]) => ({
  type: SET_LESSONS,
  payload: lessons
});

export type ObjectAction = ReturnType<typeof setClassTypes | typeof setLessons>;

export type FunctionAction = (
  dispatch: React.Dispatch<ObjectAction>,
  state: SearchState
) => void;

export type Action = ObjectAction | FunctionAction;