import { useState } from 'react';

interface UsePaginationParams {
  initialPage: number;
  maxPages: number;
}

export interface UsePaginationReturn {
  page: number;
  prevPage: () => void;
  nextPage: () => void;
  goTo: (i: number) => void;
  maxPages: number;
}

const usePagination = (
  { initialPage, maxPages }: UsePaginationParams = { initialPage: 1, maxPages: 1 }
): UsePaginationReturn => {
  const [page, setPage] = useState(initialPage);

  if (page > maxPages) {
    setPage(maxPages);
  }

  const prevPage = () => {
    if (page - 1 >= 1) setPage(page - 1);
    else setPage(page);
  };

  const nextPage = () => {
    if (page + 1 <= maxPages) setPage(page + 1);
    else setPage(page);
  };

  const goTo = (i: number) => {
    if (i >= 1 && i <= maxPages) setPage(i);
    else setPage(page);
  };

  return { page, prevPage, nextPage, goTo, maxPages };
};

export default usePagination;
