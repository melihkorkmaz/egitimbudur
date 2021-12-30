import { AuthenticatedLayout } from "../components/authenticatedLayout/AuthenticatedLayout";


export default function Dashboard() {

  return <AuthenticatedLayout currentPage="dashboard">
    Dashboard
  </AuthenticatedLayout>
}