export type Grade = {
  name: string;
  id: string;
};

export type Lesson = {
  name: string;
  id: string;
};

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