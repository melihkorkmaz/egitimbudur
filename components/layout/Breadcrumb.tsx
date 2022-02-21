import Link from 'next/link'
import styles from './breadcrumb.module.scss';

type BreadcrumbProps = {
  currentPage: string;
};

export const Breadcrumb = ({
  currentPage
}: BreadcrumbProps) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.breadcrumb}>
        <li className={styles.breadcrumbItem}>
          <Link href="/">Anasayfa</Link>
        </li>
        <li className={styles.breadcrumbItemActive} aria-current="page">
          {currentPage}
        </li>
      </ol>
    </nav>
  );
};
