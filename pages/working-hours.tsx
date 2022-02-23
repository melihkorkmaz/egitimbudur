import { AdminLayout, Card, Select } from "../components";

export default function WorkingHours() {

  return (
    <AdminLayout currentPage="dashboard">
      <Card className="px-6 py-5">
        <h1 className="text-xl text-primary p-0 m-0">Çalışma Saatleri</h1>
      </Card>

      <Card className="mt-4 px-6 py-5">
        <div className="border p-3">
          Pazartesi
          <div>
            {/* <Select options={[]} onChange={() => {}} /> */}
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
};