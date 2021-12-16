
export type ClassType = {
  name: string;
  id: string;
}

export type LessonType = {
  name: string;
  id: string;
}

export type SearchState = {
  classes: ClassType[];
  lessons: LessonType[];
};

export type StoreProviderProps = {
  initialState?: SearchState;
}