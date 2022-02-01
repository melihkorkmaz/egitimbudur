import { Layout } from "../layout/Layout";
import { UserAvatar } from "./UserAvatar";
import { Navigation } from "./Navigation";

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
  currentPage: string;
};

export const AuthenticatedLayout = ({
  children,
  currentPage
}: AuthenticatedLayoutProps) => {

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="dashboard-navbar">
          <UserAvatar />
          <Navigation activePage={currentPage} />
        </div>

        <div className="col-span-3">
          {children}
        </div>
      </div>
    </Layout>
  );
};