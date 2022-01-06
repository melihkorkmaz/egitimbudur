export type GradeType = {
  name: string;
  order: number;
  id: string;
}

export type LessonType = {
  name: string;
  order?: number;
  id: string;
}

export type TeacherServiceType = {
  id: string;
  name: string;
  order?: number;
}

export enum ServiceTypeEnum {
  oneOfOne = '1 of 1',
  solvingQuestions = 'Solving Questions',
  schoolConsulting = 'School Consulting',
}

export type TeacherServiceCategoryType = {
  id: string;
  name: ServiceTypeEnum;
}

export enum SearchFilterEnum {
  key = "k",
  gradeId = "g",
  lessonsIds = "l",
  teacherServiceCategoryIds = 'ts',
}

export type SearchQueryType = {
  [SearchFilterEnum.key]: string;
}

export type SearchFilterType = {
  key?: string;
  gradeId?: string;
  lessonIds?: string[];
  teacherServiceCategoryIds?: string[];
}

export type RateOverviewType = {
  rating: number;
  totalRated: number[];
}

export type TeacherService = {
  id: string;
  duration: number;
  price: number;
  serviceType: TeacherServiceType;
}