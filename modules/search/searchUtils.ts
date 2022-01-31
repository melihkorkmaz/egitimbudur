import type { SearchFilterType, SearchQueryType } from "../common/types";
import  { SearchFilterEnum } from "../common/types";

export const getFilterFromQuery = (query: SearchQueryType): SearchFilterType => {
  const filter = {
    gradeId: query[SearchFilterEnum.gradeId],
    key: query[SearchFilterEnum.key],
    lessonIds: query[SearchFilterEnum.lessonsIds] ? query[SearchFilterEnum.lessonsIds].split(',') : undefined,
    teacherServiceCategoryIds: query[SearchFilterEnum.teacherServiceCategoryIds] ? query[SearchFilterEnum.teacherServiceCategoryIds].split(',') : undefined,
  };

  return filter;
}