import React from 'react';
import paginatorNext from './paginatorNext.svg';

type TProps = {
  currentPage: number;
  totalItems: number;
  changer: (page: number) => void;
};

const getPages = (pagesCount: number, currentPage: number, pages: string[]) => {
  if (pagesCount > 5) {
    if (currentPage > 2) {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(`${i}`);
        if (i === pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        pages.push(`${i}`);
        if (i === pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(`${i}`);
    }
  }

  if (pages.length === 0) pages = [];

  if (+pages[0] !== 1) pages.unshift('prev');

  if (+pages[4] > 4) pages.push('next');
};

export const Paginator: React.FC<TProps> = ({
  currentPage,
  totalItems,
  changer,
}) => {
  const pagesCount = totalItems

  const pages: string[] = [];

  const handleNext = React.useCallback(() => {
    changer(currentPage + 1);
  }, [currentPage, changer]);

  const handlePrev = React.useCallback(
    () => changer(currentPage - 1),
    [currentPage, changer]
  );

  const handleSetPage = (page: string) => changer(+page)

  getPages(pagesCount, currentPage, pages);

  return (
    <div className={'pagination-wrapper'}>
      <div className={'paginator-list'}>
        {pages.map((page, i) => {
          if (page === 'prev') {
            return (
              <img
                key={i}
                onClick={handlePrev}
                className={'paginator-page paginator-back'}
                src={paginatorNext}
                alt={''}
              />
            );
          }
          if (page === 'next') {
            return (
              <img
                key={i}
                onClick={handleNext}
                className={'paginator-page paginator-next'}
                src={paginatorNext}
                alt={''}
              />
            );
          }
          return (
            <span
              key={i}
              onClick={() => handleSetPage(page)}
              className={
                currentPage === +page
                  ? 'paginator-active-page paginator-page'
                  : 'paginator-page'
              }
            >
              {page}
            </span>
          );
        })}
      </div>
    </div>
  );
};
