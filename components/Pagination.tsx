import { connectPagination } from 'react-instantsearch-dom';
import cx from 'classnames';

export const Pagination = connectPagination(({ currentRefinement, nbPages, createURL }) => {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <ul className="pagination p-center">
          {new Array(nbPages).fill(null).map((_, index) => {
            const page = index + 1;
            const isCurrent = currentRefinement === page;

            return (
              <li key={index} className={cx('page-item', { 'active' : isCurrent })}>
                <a className="page-link" href={createURL(page)}>
                  {page}
                </a>
              </li>
            );

          })}
        </ul>
      </div>
    </div>
  );
});
