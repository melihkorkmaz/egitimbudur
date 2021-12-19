import { SearchFilterEnum, SearchFilterType, SearchQueryType } from "../types/common";


export const getFilterFromQuery = (query: SearchQueryType): SearchFilterType => {
  const filter = {
    gradeId: query[SearchFilterEnum.gradeId],
    key: query[SearchFilterEnum.key],
    lessonIds: query[SearchFilterEnum.lessonsIds] ? query[SearchFilterEnum.lessonsIds].split(',') : undefined,
    teacherServiceCategoryIds: query[SearchFilterEnum.teacherServiceCategoryIds] ? query[SearchFilterEnum.teacherServiceCategoryIds].split(',') : undefined,
  };

  return filter;
}

export const getFilter = (): SearchFilterType | undefined => {
  const filter =localStorage.getItem('userSearchFilter');

  if (!filter) {
    return;
  }

  return JSON.parse(filter) as SearchFilterType;
}

export const getGenerateSearchUrl = (filter: SearchFilterType): string => {
  let query = `?`;

  if (filter.key) {
    query += `${SearchFilterEnum.key}=${filter.key}&`;
  }

  if (filter.gradeId) {
    query += `${SearchFilterEnum.gradeId}=${filter.gradeId}&`;
  }

  if(filter.lessonIds) {
    query += `${SearchFilterEnum.lessonsIds}=${filter.lessonIds.join(',')}&`;
  }

  if (filter.teacherServiceCategoryIds) {
    query += `${SearchFilterEnum.teacherServiceCategoryIds}=${filter.teacherServiceCategoryIds.join(',')}&`;
  }

  return query;
}