import { Layout } from '../components/layout/Layout';
import { PageTitle } from "../components/layout/PageTitle";
import { Breadcrumb } from "../components/layout/Breadcrumb";
import { Filters } from "../components/Filters";
import { ResultsHeader } from "../components/ResultsHeader";
import { TeacherCard } from "../components/TeacherCard";
import { Pagination } from "../components/Pagination";
import { getClassTypes, getLessons } from "../services/searchService";
import { ClassType, LessonType } from "../store/search/types";

type TeachersProps = {
  classes: ClassType[];
  lessons: LessonType[];
};

export default function Teachers({
  classes,
  lessons,
}: TeachersProps) {
  return (
    <Layout pageTitle="Ogretmenler" breadcrumb={<Breadcrumb currentPage="Ogretmenler" />}>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          <Filters classes={classes} lessons={lessons} />
        </div>

        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
          <ResultsHeader />

          <div className="justify-content-center">
            <TeacherCard asListItem />
            <TeacherCard asListItem />
            <TeacherCard asListItem />
            <TeacherCard asListItem />
            <TeacherCard asListItem />
            <TeacherCard asListItem />
          </div>
          <Pagination />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const classes = await getClassTypes();
  const lessons = await getLessons();
  return {
    props: {
      classes,
      lessons
    }, // will be passed to the page component as props
  }
}