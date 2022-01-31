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
        className="hero_banner image-cover image_bottom"
        style={{ background: '#f7f8f9 url(/css/img/banner-1.png) no-repeat' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 col-md-10 col-sm-12">
              <div className="simple-search-wrap">
                <div className="hero_search-2 text-center">
                  <h1 className="banner_title mb-4">
                    Slogan, slogan, slogan,Slogan, slogan, slogan,Slogan, slogan,
                  </h1>
                  <p className="font-lg mb-4">
                    Kisa aciklama yada slogan....Kisa aciklama yada slogan....Kisa aciklama yada slogan....Kisa aciklama yada slogan....
                  </p>
                  <Search grades={grades} lessons={lessons} />
                </div>
              </div>
            </div>
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
