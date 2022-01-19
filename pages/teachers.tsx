import { Layout } from '../components/layout/Layout';
import { Breadcrumb } from "../components/layout/Breadcrumb";
import { Filters } from "../components/filters/Filters";
import { ResultsHeader } from "../components/ResultsHeader";
import { TeacherCard } from "../components/TeacherCard";
import { Pagination } from "../components/Pagination";
import { getServices, searchTeachers } from "../services/searchService";
import { useState } from 'react';
import { GradeType, LessonType, SearchFilterType, TeacherServiceCategoryType } from '../types/common';
import { getFilterFromQuery } from '../utils/searchUtils';
import { getGrades } from '../services/gradesService';
import { getLessons } from '../services/lessonServices';
import { Teacher } from '../types/user';
import { Hits } from 'react-instantsearch-dom';
import { mapAlgoliaTeacherHit } from '../utils/algolia';

type TeachersProps = {
  classes: GradeType[];
  lessons: LessonType[];
  services: TeacherServiceCategoryType[];
  initialTeachers: Teacher[];
};

const Hit = ({ hit }) => {
  return <TeacherCard 
    key={hit.objectID} 
    teacher={mapAlgoliaTeacherHit(hit)} 
    onClick={() => window.open(`/teacher/${hit.objectID}`, '_blank')} 
    asListItem />;
}

export default function Teachers({
  classes,
  lessons,
  services,
  initialTeachers = [],
}: TeachersProps) {
  const [ teachers, setTeachers ] = useState<Teacher[]>(initialTeachers);

  const handleFilterChange = async (filter: SearchFilterType) => {
    // const teachers = await searchTeachers(filter);
    // setTeachers([teachers[0]]);
  };
  
  return (
    <Layout pageTitle="Ogretmenler" breadcrumb={<Breadcrumb currentPage="Ogretmenler" />}>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          <Filters classes={classes} lessons={lessons} services={services} onChange={handleFilterChange} />
        </div>

        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mb-5">
          <ResultsHeader />

          <div className="justify-content-center">
            <Hits hitComponent={Hit} />
          </div>
          <Pagination />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const classes = await getGrades();
  const lessons = await getLessons();
  const services = await getServices();
  const filter = getFilterFromQuery(context.query);
  const teachers = await searchTeachers(filter);
  
  return {
    props: {
      classes,
      lessons,
      services,
      initialTeachers: teachers,
    }, // will be passed to the page component as props
  }
}