import React from "react";

// COMPONENTS
import { Layout } from "../components/layout/Layout";
import { Search } from "../modules/search/components";

// SERVICES
import { getGrades } from "../modules/common/gradesService";
import { getLessons } from "../modules/common/lessonServices";

// TYPES
import type { Grade, Lesson } from "../modules/common/types";

type HomeProps = {
  grades: Grade[];
  lessons: Lesson[];
};

export default function Home({
  grades,
  lessons
}: HomeProps) {
  return (
    <Layout homePage>
      <div
        className="min-h-[600px] bg-gray-100 h-screen bg-cover justify-center flex items-center relative bg-origin-padding bg-no-repeat bg-bottom"
        style={{ backgroundImage: 'url(/css/img/banner-1.png)' }}
      >
        <div className="container">
          <div className="max-w-5xl text-center mx-auto">
            <h1 className="mb-5 font-bold text-5xl capitalize text-gray-700">
              Slogan, slogan, slogan,Slogan, slogan, slogan,Slogan, slogan,
            </h1>
            <p className="text-gray-700 text-lg mb-10">
              Kisa aciklama yada slogan....Kisa aciklama yada slogan....Kisa aciklama yada slogan....Kisa aciklama yada slogan....
            </p>
            <Search grades={grades} lessons={lessons} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const grades = await getGrades();
  const lessons = await getLessons();

  return {
    props: {
      grades,
      lessons
    }
  }
}
