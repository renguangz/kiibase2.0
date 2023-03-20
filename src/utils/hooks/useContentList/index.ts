import { useState } from 'react';

export function useContentList(asPath: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  return {
    data,
    loading,
    currentPage,
    perPage,
  };
}
