export const Pagination = () => {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <ul className="pagination p-center">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span className="ti-arrow-left"></span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              ...
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              18
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span className="ti-arrow-right"></span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
