import { Hits } from 'react-instantsearch-dom';
// Components
import { Layout, Breadcrumb } from '../components/layout';
import { Facets, ResultsHeader, Pagination, SearchResultItem } from "../modules/search/components";

// Services & Helpers
import { getGrades } from '../modules/common/gradesService';
import { getLessons } from '../modules/common/lessonServices';
import { getServices } from '../modules/common/commonService';

// Types
import type { Teacher, Service } from '../modules/teacher/types';
import type { Grade, Lesson } from '../modules/common/types'
import { withServices } from '../modules/search/components/SearchResultItem';

type TeachersProps = {
  classes: Grade[];
  lessons: Lesson[];
  services: Service[];
  initialTeachers: Teacher[];
};

export default function Teachers({
  classes,
  lessons,
  services,
}: TeachersProps) {
  return (
    <Layout pageTitle="Öğretmenler" breadcrumb={<Breadcrumb currentPage="Öğretmenler" />}>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          <Facets 
            classes={classes} 
            lessons={lessons} 
            services={services}/>
        </div>

        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mb-5">
          <ResultsHeader />
          <div className="justify-content-center">
            <Hits hitComponent={withServices(SearchResultItem, services)} />
          </div>
          <Pagination />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const classes = await getGrades();
  const lessons = await getLessons();
  const services = await getServices();

  return {
    props: {
      classes,
      lessons,
      services
    }
  }
}