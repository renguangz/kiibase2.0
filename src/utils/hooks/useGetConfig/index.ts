import { fetchMockData } from '@/src/mock/db/utils/fetchMockData';
import searchLogConfig from '@/src/mock/db/utils/getConfig/searchLog.json';
import bannerConfig from '@/src/mock/db/utils/getConfig/bannerConfig.json';
import { useEffect, useMemo, useState } from 'react';

type ConfigDataType = {
  topic: string;
  routes: string;
  canBeCreate: boolean;
  canBeDelete: boolean;
  canBeCopy: boolean;
  listExtend: boolean;
  filter: never[];
  index_join: never[];
  select_column: never[];
  list: any[];
  listOrder: {
    field: string;
    sortField: string;
    direction: string;
  }[];
  date_filter: boolean;
  date_filter_title?: string;
  date_filter_column: string[];
  search_map: any;
  appends: string[];
  excel: {
    export: boolean;
    title: string[];
    join: any;
    column: string[];
  };
  module: any;
} | null;

const mockMapping = [
  { mockUrl: '/searchLog', mockData: searchLogConfig },
  {
    mockUrl: '/banner',
    mockData: bannerConfig,
  },
];

const findMockData = (url: string) => mockMapping.find((item) => item.mockUrl === url)?.mockData ?? null;

export function useGetConfig(asPath: string) {
  const [data, setData] = useState<ConfigDataType>(null);
  const [loading, setLoading] = useState(true);

  const mockData = useMemo(
    () => findMockData(asPath) && fetchMockData(findMockData(asPath)),
    [asPath, findMockData, fetchMockData],
  );

  useEffect(() => {
    setData(mockData);
  }, [mockData]);

  return {
    data,
    loading,
  };
}
