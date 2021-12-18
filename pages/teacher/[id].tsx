import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Comments } from '../../components/reviews/Comments';
import { TeacherCard } from '../../components/TeacherCard';
import { getTeacher } from '../../services/userService';
import { TeacherType } from '../../types/user';

type TeacherProps = {
  teacher: TeacherType;
}

export default function Teacher({ teacher }: TeacherProps) {
  return (
    <Layout pageTitle={<TeacherCard teacher={teacher} />}>
      <div className="row">

        <div className="col-lg-8 col-md-12 order-lg-first">
          {teacher.description && <div className="edu_wraper mb-4">
            <h4 className="edu_title">Hakkinda</h4>
            <p>{teacher.description}</p>
          </div>}
          <div className="rating-overview mb-4">
            <div className="rating-overview-box">
              <span className="rating-overview-box-total">{teacher.rating}</span>
              <span className="rating-overview-box-percent">out of 5.0</span>
              <div className="star-rating" data-rating="5"><i className="ti-star"></i><i className="ti-star"></i><i className="ti-star"></i><i className="ti-star"></i><i className="ti-star"></i>
              </div>
            </div>

            <div className="rating-bars">
              <div className="rating-bars-item">
                <span className="rating-bars-name">5 Star</span>
                <span className="rating-bars-inner">
                  <span className="rating-bars-rating high" data-rating="4.7">
                    <span className="rating-bars-rating-inner" style={{ width: "85%" }}></span>
                  </span>
                  <strong>85%</strong>
                </span>
              </div>
              <div className="rating-bars-item">
                <span className="rating-bars-name">4 Star</span>
                <span className="rating-bars-inner">
                  <span className="rating-bars-rating good" data-rating="3.9">
                    <span className="rating-bars-rating-inner" style={{ width: "75%" }}></span>
                  </span>
                  <strong>75%</strong>
                </span>
              </div>
              <div className="rating-bars-item">
                <span className="rating-bars-name">3 Star</span>
                <span className="rating-bars-inner">
                  <span className="rating-bars-rating mid" data-rating="3.2">
                    <span className="rating-bars-rating-inner" style={{ width: "52.2%" }}></span>
                  </span>
                  <strong>53%</strong>
                </span>
              </div>
              <div className="rating-bars-item">
                <span className="rating-bars-name">1 Star</span>
                <span className="rating-bars-inner">
                  <span className="rating-bars-rating poor" data-rating="2.0">
                    <span className="rating-bars-rating-inner" style={{ width: "20%" }}></span>
                  </span>
                  <strong>20%</strong>
                </span>
              </div>
            </div>
          </div>

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