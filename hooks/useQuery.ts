import { DocumentNode, QueryHookOptions, useLazyQuery, useQuery as useApolloQuery } from "@apollo/client";
import { useMemo } from "react";
import { IEntity } from "../entities/IEntity";

export const useQuery = <T extends any>(
  query: DocumentNode, 
  instance: new (data: IEntity) => T,
  variables?: {
    [key: string]: any;
  }) => {

  const [getLazyData] = useLazyQuery(query);

  const {loading, error, data, refetch } = useApolloQuery(query, {
    variables
  });

  const mappedData = useMemo(() => {
    if (loading || error || !data) {
      return [];
    }

    return data[Object.keys(data)[0]].data.map(d => new instance(d));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  const fetch = async (variables?: {
    [key: string]: any;
  }) => {
    const { data: res } = await getLazyData({ variables });

    const entity = res[Object.keys(res)[0]].data as IEntity;

    return new instance(entity);
  }

  return {
    loading,
    error,
    refetch,
    fetch,
    data: mappedData as Array<T>
  }
}