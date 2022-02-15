
// Components
import { Layout, Panel } from "../../../components";
import { TeacherCard } from "../../../modules/teacher/components";

// Services
import { getTeacher } from "../../../modules/teacher/teacherService";

// Types
import type { Teacher } from "../../../modules/teacher/types";

type ScheduleProps = {
  teacher?: Teacher;
}

export default function Schedule({ teacher }: ScheduleProps) {
  if (!teacher) {
    // TODO: handle this
    return null;
  }

  return (
    <Layout pageTitle={<TeacherCard teacher={teacher} />}>
      <div className="flex gap-8 mb-5">
        <Panel className="flex-1">
          sol
        </Panel>
        <Panel className="basis-96">
          sag
        </Panel>
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