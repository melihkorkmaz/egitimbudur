import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SearchFilterType, SearchQueryType } from "../types/common";
import { getFilter, getGenerateSearchUrl, getFilterFromQuery } from "../utils/searchUtils"

export const useFilter = () => {
  const [currentFilter, setCurrentFilter] = useState<SearchFilterType | undefined>();
  const router = useRouter()

  useEffect(() => {
    const filterFromQuery = getFilterFromQuery(router.query as SearchQueryType);
    const filterFromCache = getFilter();
    
    if (typeof window !== "undefined" && filterFromQuery && !Object.values(filterFromQuery).every(v => v === undefined)) {
      localStorage.setItem('userSearchFilter', JSON.stringify(filterFromQuery));
      setCurrentFilter(filterFromQuery);
    } else if (filterFromCache){
      setFilter(filterFromCache, false);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const setFilter = (filter: SearchFilterType, shallow: boolean = true) => {
    router.push(`/teachers${getGenerateSearchUrl(filter)}`, undefined, { shallow });
  };

  const clearFilter = () => {
    setCurrentFilter(undefined);
    localStorage.removeItem('userSearchFilter');
    router.push('/teachers', undefined, { shallow: true });
  };

  return {
    filter: currentFilter,
    setFilter,
    hasFilter: !Object.values(currentFilter || {}).every(v => v === undefined),
    clearFilter
  }
}