import React, { useEffect } from "react";
import { Search } from "../components/Search";
import { Layout } from "../components/layout/Layout";
import { GradeType, LessonType } from "../types/common";
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { getGrades } from "../services/gradesService";
import { getLessons } from "../services/lessonServices";

type HomeProps = {
  grades: GradeType[];
  lessons: LessonType[];
};

export default function Home({
  grades,
  lessons
}: HomeProps) {

  useEffect(() => {
    const getData = async () => {
      const db = getFirestore();
      const q = query(collection(db, "grade"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        console.log("Document data:", querySnapshot.docs[0].data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    getData();
  }, []);

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
    }, // will be passed to the page component as props
  }
}
