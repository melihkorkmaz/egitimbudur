export type GradeType = {
  name: string;
  order?: number;
  id: string;
}

export type LessonType = {
  name: string;
  order?: number;
  id: string;
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