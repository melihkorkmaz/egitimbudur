import { useCallback, useContext } from "react";
import { setClassTypes, setLessons } from "./actions";
import { DispatchContext, StoreContext } from "./store";
import { ClassType, LessonType } from "./types";

export const useSearchStore = () => {
  const store = useContext(StoreContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatch = useCallback(useContext(DispatchContext), []);

  return {
    ...store,
    setClassTypes: (classTypes: ClassType[]) => dispatch(setClassTypes(classTypes)),
    setLessons: (lessons: LessonType[]) => dispatch(setLessons(lessons)),
  }
};