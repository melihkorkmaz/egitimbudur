import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Comments } from '../../components/comments/Comments';
import { TeacherCard } from '../../components/TeacherCard';
import { getTeacher } from '../../services/userService';
import { TeacherType } from '../../types/user';
import { RatingForm } from '../../components/rating/RatingForm';
import { RatingOverview } from '../../components/rating/RatingOverview';

type TeacherProps = {
  teacher: TeacherType;
}

export default function Teacher({ teacher }: TeacherProps) {

  const handleUserRate = (rating: number) => {
    console.log("rating", rating);
  };

  return (
    <Layout pageTitle={<TeacherCard teacher={teacher} />}>
      <div className="row">

        <div className="col-lg-8 col-md-12 order-lg-first">
          {teacher.description && <div className="edu_wraper mb-4">
            <h4 className="edu_title">Hakkinda</h4>
            <p>{teacher.description}</p>
          </div>}
          <RatingOverview teacherId={teacher.id} onRate={handleUserRate} />
          <Comments teacherId={teacher.id} userCanComment={true}/>
        </div>

        <div className="col-lg-4 col-md-12 order-lg-last">

          <div className="ed_view_box style_2 stick_top">

            <div className="ed_author">
              <h2 className="theme-cl m-0">{teacher.basePrice.toFixed(2)} TL</h2>
            </div>
            <div className="ed_view_features">
              <div className="eld mb-3">
                <h5 className="font-medium">Branslar:</h5>
                <ul>
                  <li><i className="fa fa-check"></i>Matematik</li>
                  <li><i className="fa fa-check"></i>Fen Bilgisi</li>
                </ul>
              </div>
              <div className="eld mb-3">
                <h5 className="font-medium">Sinif:</h5>
                <ul>
                  <li><i className="fa fa-check"></i>5. Sinif</li>
                  <li><i className="fa fa-check"></i>6. Sinif</li>
                  <li><i className="fa fa-check"></i>7. Sinif</li>
                </ul>
              </div>
              <div className="eld mb-3">
                <h5 className="font-medium">Alinabilecek Hizmetler:</h5>
                <ul>
                  <li><i className="fa fa-check"></i>1-1 Ozel Ders</li>
                  <li><i className="fa fa-check"></i>Soru Cozumu</li>
                  <li><i className="fa fa-check"></i>Tercih Danismanligi</li>
                </ul>
              </div>
            </div>
            <div className="ed_view_link">
              <a href="#" className="btn theme-bg enroll-btn">Ders Planla<i className="ti-angle-right"></i></a>
            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const teacher = await getTeacher(id);
  return {
    props: {
      teacher
    },
  }
}