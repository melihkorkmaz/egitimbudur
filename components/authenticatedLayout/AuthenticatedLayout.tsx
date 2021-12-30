import { Layout } from "../layout/Layout";
import { UserAvatar } from "./UserAvatar";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
} 

export const AuthenticatedLayout = ({
  children
}: AuthenticatedLayoutProps) => {

  return (
    <Layout>
    <div className="grid grid-cols-4 gap-1 mb-8">
      <div className="dashboard-navbar">

        <UserAvatar />

        <div className="d-navigation">
          <ul id="side-menu">
            <li className="active"><a href="dashboard.html"><i className="fas fa-th"></i>Dashboard</a></li>
            <li className="dropdown">
              <a href="javascript:void(0);"><i className="fas fa-shopping-basket"></i>Courses</a>
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