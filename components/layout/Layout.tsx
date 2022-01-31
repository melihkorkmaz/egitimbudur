import cx from "classnames";
import styles from './layout.module.scss';

// Components
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageTitle } from "./PageTitle";

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
