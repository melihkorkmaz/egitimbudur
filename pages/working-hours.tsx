import { useState } from "react";
import { AdminLayout, Card, Select } from "../components";

const hoursOfDay = (new Array(24).fill(null)).reduce((previous, current, index) => {
  const hour = index < 10 ? `0${index}` : index;

  previous.push(`${hour}:00`);
  previous.push(`${hour}:30`);

  return previous;
}, []);

const hours = () => {

export default function WorkingHours() {
  const [selectedHour, setSelectedHour] = useState('09:00');
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
            <Select selectedValue={selectedHour} selectedText={selectedHour} onChange={setSelectedHour}>
              {hoursOfDay.map(h => (
                <Select.Item key={h} value={h}>
                  {h}
                </Select.Item>
              ))}
            </Select>
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
};