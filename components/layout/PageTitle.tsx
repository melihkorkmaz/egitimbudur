
type PageTitleProps = {
  children: string | React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export const PageTitle = ({
  children,
  breadcrumb
}: PageTitleProps) => {
  return (
    <section className="page-title pt-12 pb-6">
      <div className="container mx-auto">
          <div>
            {typeof children === 'string' && <h1 className="breadcrumb-title mb-4">{children}</h1>}
            {typeof children === 'object' && children}
            {breadcrumb}
          </div>
        </div>
    </section>
  );
};
