import { Layout } from '../components/layout/Layout';
import { Breadcrumb } from "../components/layout/Breadcrumb";
import { Filters } from "../components/Filters";
import { ResultsHeader } from "../components/ResultsHeader";
import { TeacherCard } from "../components/TeacherCard";
import { Pagination } from "../components/Pagination";
import { getGrades, getLessons, searchTeachers } from "../services/searchService";
import { useState } from 'react';
import { TeacherType } from '../types/user';
import { GradeType, LessonType } from '../types/common';

type TeachersProps = {
  classes: GradeType[];
  lessons: LessonType[];
  initialTeachers: TeacherType[];
};

export default function Teachers({
  classes,
  lessons,
  initialTeachers = [],
}: TeachersProps) {

  const [teachers] = useState<TeacherType[]>(initialTeachers);


  return (
    <Layout pageTitle="Ogretmenler" breadcrumb={<Breadcrumb currentPage="Ogretmenler" />}>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          <Filters classes={classes} lessons={lessons} />
        </div>

        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
          <ResultsHeader />

          <div className="justify-content-center">
            {teachers.map(teacher => (
              <TeacherCard key={teacher.id} teacher={teacher} asListItem />
            ))}
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
  const teachers = await searchTeachers();

  return {
    props: {
      classes,
      lessons,
      initialTeachers: teachers,
    }, // will be passed to the page component as props
  }
}