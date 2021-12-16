import React from "react";
import { Search } from "../components/Search";
import { getClassTypes, getLessons } from "../services/searchService";
import { ClassType, LessonType } from "../store/search/types";
import { Layout } from "../components/layout/Layout";

type HomeProps = {
  classes: ClassType[];
  lessons: LessonType[];
};

export default function Home({
  classes,
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
                  <Search classes={classes} lessons={lessons} />
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
  const classes = await getClassTypes();
  const lessons = await getLessons();
  return {
    props: {
      classes,
      lessons
    }, // will be passed to the page component as props
  }
}
