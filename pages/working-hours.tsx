import { AdminLayout, Card } from "../components";

export default function WorkingHours() {

  return (
    <AdminLayout currentPage="dashboard">
      <Card>
        <h1 className="text-xl text-primary">Çalışma Saatleri</h1>
      </Card>
    </AdminLayout>
  );
};