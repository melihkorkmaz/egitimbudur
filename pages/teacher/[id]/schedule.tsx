
// Components
import { useState } from "react";
import { Alert, Layout, Card, Scheduler, Select } from "../../../components";
import { ScheduleState } from "../../../modules/common/schedulerUtils";
import { TeacherCard } from "../../../modules/teacher/components";

// Services
import { getTeacher } from "../../../modules/teacher/teacherService";

// Types
import type { Teacher } from "../../../modules/teacher/types";

type ScheduleProps = {
  teacher?: Teacher;
}

export default function Schedule({ teacher }: ScheduleProps) {
  const [selectedService, setSelectedService] = useState(teacher?.availableServiceTypes[0].id);
  if (!teacher) {
    // TODO: handle this
    return null;
  }

  return (
    <Layout pageTitle={<TeacherCard teacher={teacher} />}>
      <div className="flex gap-8 mb-5">
        <Card className="flex-1">
          <Scheduler />
        </Card>
        <Card className="basis-96">
          <h4 className="text-gray-500 text-lg">Alınacak Hizmet Tipi</h4>
          <Select options={teacher.availableServiceTypes.map(s => ({
            key: s.name,
            value: s.id
          }))} 
          selected={selectedService}
          onChange={(i) => setSelectedService(i.value as string)}
          block
          />
          <Alert className="mt-2">
            Lutfen takvimden taraftan gun ve saat seciniz!
          </Alert>
        </Card>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: { query: { id: string; }; }) {
  const { id } = context.query;
  const teacher = await getTeacher(id);

  return {
    props: {
      teacher
    },
  }
};