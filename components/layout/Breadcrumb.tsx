import Link from 'next/link'

type BreadcrumbProps = {
  currentPage: string;
};

export const Breadcrumb = ({
  currentPage
}: BreadcrumbProps) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb p-0 bg-white">
        <li className="breadcrumb-item">
          <Link href="/">Anasayfa</Link>
        </li>
        <li className="breadcrumb-item active theme-cl" aria-current="page">
          {currentPage}
        </li>
      </ol>
    </nav>
  );
};
