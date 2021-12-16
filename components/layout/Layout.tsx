import { Footer } from "./Footer";
import { Header } from "./Header";
import cx from "classnames";
import { PageTitle } from "./PageTitle";
import styles from './layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
  homePage?: boolean;
  pageTitle?: string | React.ReactNode;
  breadcrumb?: React.ReactNode;
};

export const Layout = ({ children, homePage, pageTitle, breadcrumb}: LayoutProps) => {
  return (
    <div className={styles.mainLayout}>
      <Header className={cx({
        'header-transparent': homePage,
        'head-shadow': !homePage
      })} />
      <div className="flex-1">
        {pageTitle && <PageTitle breadcrumb={breadcrumb}>
          {pageTitle}
        </PageTitle>}
        <section className="gray pt-10 h-full">
          {!homePage && <div className="container">
            {children}
          </div>}

          {homePage && children}
        </section>
      </div>
      <Footer />
    </div>
  );
};
