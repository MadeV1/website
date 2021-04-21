import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';
import PaginationStyles from 'styles/UI/Pagination.module.css';

import PaginationButton from '@/components/UI/Pagination/PaginationButton';
import Separator from '@/components/UI/Pagination/PaginationSeparator';

interface Props {
  page: number;
  prevPage: () => void;
  nextPage: () => void;
  goToPage: (i: number) => void;
  last?: number;
}

interface Pages {
  left: number;
  middle: number;
  right: number;
}

const Pagination: FC<Props> = ({ page, prevPage, nextPage, goToPage, last = 0 }) => {
  const pages: Pages = { left: 0, middle: 0, right: 0 };
  if (last < 8) {
    pages.left = last;
    pages.middle = 0;
    pages.right = 0;
  } else if (page <= 3) {
    pages.left = 4;
    pages.middle = 0;
    pages.right = 3;
  } else if (page >= 3 && page <= last - 3) {
    pages.left = 1;
    pages.middle = 3;
    pages.right = 1;
  } else {
    pages.left = 3;
    pages.middle = 0;
    pages.right = 4;
  }

  const left = [...Array(pages.left).fill(null)].map((_, i) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <PaginationButton key={i + 1} onClick={() => goToPage(i + 1)} disabled={i + 1 === page}>
        {i + 1}
      </PaginationButton>
    );
  });
  const middle = [...Array(pages.middle).fill(null)].map((_, i) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <PaginationButton key={i + page - 1} onClick={() => goToPage(i + page - 1)} disabled={i + page - 1 === page}>
        {i + page - 1}
      </PaginationButton>
    );
  });

  const right = [...Array(pages.right).fill(null)]
    .map((_, i) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <PaginationButton key={last - i} onClick={() => goToPage(last - i)} disabled={last - i === page}>
          {last - i}
        </PaginationButton>
      );
    })
    .reverse();

  return (
    <nav className={PaginationStyles.nav} aria-label="Pagination">
      <PaginationButton onClick={() => prevPage()}>
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" fill="currentColor" />
      </PaginationButton>
      {left}
      {middle.length > 0 || right.length > 0 ? <Separator /> : ''}
      {middle.length > 0 && middle}
      {middle.length > 0 && <Separator />}
      {right}
      <PaginationButton onClick={() => nextPage()}>
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" fill="currentColor" />
      </PaginationButton>
    </nav>
  );
};

export default Pagination;
