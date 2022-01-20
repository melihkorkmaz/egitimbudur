import cx from 'classnames';
import { connectPagination } from 'react-instantsearch-dom';

export const Pagination = connectPagination(({ currentRefinement, nbPages, createURL }) => {

  const pages = new Array(nbPages).fill(null).map((_, index) => ({
    index,
    page: index + 1,
    isCurrent: index + 1 === currentRefinement,
  }));

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <ul className="pagination p-center">
          {pages.map(({ page, isCurrent, index }) => (
            <li key={index} className={cx('page-item', { 'active': isCurrent })}>
              <a className="page-link" href={createURL(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
