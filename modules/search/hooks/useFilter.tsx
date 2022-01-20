import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// HELPERS
import { getFilterFromQuery } from "../../../utils/searchUtils"

// TYPES
import type { SearchFilterType, SearchQueryType } from "../../../types/common";

export const useFilter = () => {
  const [currentFilter, setCurrentFilter] = useState<SearchFilterType | undefined>();
  const router = useRouter()

  useEffect(() => {
    const filterFromQuery = getFilterFromQuery(router.query as SearchQueryType);
    setCurrentFilter(filterFromQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return {
    filter: currentFilter,
  }
}