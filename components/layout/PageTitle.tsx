
type PageTitleProps = {
  children: string | React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export const PageTitle = ({
  children,
  breadcrumb
}: PageTitleProps) => {
  return (
    <section className="page-title pt-12 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="breadcrumbs-wrap">
              {typeof children === 'string' && <h1 className="breadcrumb-title">{children}</h1>}
              {typeof children === 'object' && children}
              {breadcrumb}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
