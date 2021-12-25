import React from "react";
import { Search } from "../components/Search";
import { getGrades, getLessons } from "../services/searchService";
import { Layout } from "../components/layout/Layout";
import { GradeType, LessonType } from "../types/common";

type HomeProps = {
  grades: GradeType[];
  lessons: LessonType[];
};

export default function Home({
  grades,
  lessons
}: HomeProps) {
  return (
    <Layout homePage>
      <div
        className="hero_banner image-cover image_bottom"
        style={{background: '#f7f8f9 url(/css/img/banner-1.png) no-repeat'}}
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
    }, // will be passed to the page component as props
  }
}
