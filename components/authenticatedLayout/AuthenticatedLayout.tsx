import cx from "classnames";
import { Layout } from "../layout/Layout";
import { UserAvatar } from "./UserAvatar";
import Link from "next/link";
interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  currentPage: string;
} 

export const AuthenticatedLayout = ({
  children,
  currentPage: activePage
}: AuthenticatedLayoutProps) => {

  return (
    <Layout>
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="dashboard-navbar">

        <UserAvatar />

        <div className="d-navigation">
          <ul id="side-menu">
            <li className={cx({ active: activePage === 'dashboard'})}>
              <Link href="/dashboard">
                <a>
                  <i className="fas fa-th"></i>Anasayfa
                </a>
              </Link>
            </li>
            <li className={cx({ active: activePage === 'my-profile'})}>
              <Link href="/my-profile">
                <a>
                  <i className="fas fa-th"></i>Profilim
                </a>
              </Link>
            </li>
            <li className="dropdown">
              <a href="javascript:void(0);"><i className="fas fa-gem"></i>Enrollment</a>
            </li>
            <li className="dropdown">
              <a href="javascript:void(0);"><i className="fas fa-archive"></i>Report</a>
            </li>
            <li className="dropdown">
              <a href="javascript:void(0);"><i className="fas fa-user-shield"></i>Admins</a>
            </li>
            <li className="dropdown">
              <a href="javascript:void(0);"><i className="fas fa-toolbox"></i>Instructors</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="col-span-3">
        {children}
      </div>
    </div>
  </Layout>
  );
};