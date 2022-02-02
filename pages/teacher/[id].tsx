// Components
import { Layout } from '../../components/layout/Layout';
import { TeacherCard, Comments, SideBar } from '../../modules/teacher/components';

// Services
import { getTeacher } from '../../modules/teacher/teacherService';

// Types
import type { Teacher } from '../../modules/teacher/types';

type TeacherProps = {
  teacher?: Teacher;
}

export default function Teacher({ teacher }: TeacherProps) {
  if (!teacher) {
    // TODO: handle this
    return null;
  }

  return (
    <Layout pageTitle={<TeacherCard teacher={teacher} />}>
      <div className="row">

        <div className="col-lg-8 col-md-12 order-lg-first mb-5">
          {teacher.about && <div className="edu_wraper mb-4">
            <h4 className="edu_title">Hakkinda</h4>
            <div dangerouslySetInnerHTML={{
              __html: teacher.about || ""
            }} />
          </div>}
          <Comments comments={teacher.comments} userCanComment={true}/>
        </div>

        <div className="col-lg-4 col-md-12 order-lg-last">
          <SideBar teacher={teacher} />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: { query: { id: string; }; }) {
  const { id } = context.query;
  const teacher = await getTeacher(id);

  return {
    props: {
      teacher
    },
  }
};