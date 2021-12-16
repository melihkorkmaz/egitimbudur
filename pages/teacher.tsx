import React from 'react';
import { Layout } from '../components/layout/Layout';
import { PageTitle } from '../components/layout/PageTitle';
import { TeacherCard } from '../components/TeacherCard';
export default function Teacher() {



  return (
    <Layout pageTitle={<TeacherCard />}>
      <div className="row">

        <div className="col-lg-8 col-md-12 order-lg-first">
          <div className="edu_wraper">
            <h4 className="edu_title">Hakkinda</h4>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          </div>
          <div className="rating-overview">
            <div className="rating-overview-box">
              <span className="rating-overview-box-total">4.2</span>
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

          <div className="list-single-main-item fl-wrap">
            <div className="list-single-main-item-title fl-wrap">
              <h3>Yorumlar</h3>
            </div>
            <div className="reviews-comments-wrap">
              <div className="reviews-comments-item">
                <div className="review-comments-avatar">
                  <img src="https://via.placeholder.com/500x500" className="img-fluid" alt="" />
                </div>
                <div className="reviews-comments-item-text">
                  <h4><a href="#">Josaph Manrty</a><span className="reviews-comments-item-date"><i className="ti-calendar theme-cl"></i>27 Oct 2019</span></h4>

                  <div className="listing-rating"><i className="fas fa-star active"></i><i className="fas fa-star active"></i><i className="fas fa-star active"></i><i className="fas fa-star active"></i><i className="fas fa-star active"></i></div>
                  <div className="clearfix"></div>
                  <p>" Commodo est luctus eget. Proin in nunc laoreet justo volutpat blandit enim. Sem felis, ullamcorper vel aliquam non, varius eget justo. Duis quis nunc tellus sollicitudin mauris. "</p>
                  <div className="pull-left reviews-reaction">
                    <a href="#" className="comment-like active"><i className="ti-thumb-up"></i> 12</a>
                    <a href="#" className="comment-dislike active"><i className="ti-thumb-down"></i> 1</a>
                    <a href="#" className="comment-love active"><i className="ti-heart"></i> 07</a>
                  </div>
                </div>
              </div>
              <div className="reviews-comments-item">
                <div className="review-comments-avatar">
                  <img src="https://via.placeholder.com/500x500" className="img-fluid" alt="" />
                </div>
                <div className="reviews-comments-item-text">
                  <h4><a href="#">Rita Chawla</a><span className="reviews-comments-item-date"><i className="ti-calendar theme-cl"></i>2 Nov May 2019</span></h4>

                  <div className="listing-rating"><i className="fas fa-star active"></i><i className="fas fa-star active"></i><i className="fas fa-star active"></i><i className="fas fa-star active"></i><i className="fas fa-star"></i></div>
                  <div className="clearfix"></div>
                  <p>" Commodo est luctus eget. Proin in nunc laoreet justo volutpat blandit enim. Sem felis, ullamcorper vel aliquam non, varius eget justo. Duis quis nunc tellus sollicitudin mauris. "</p>
                  <div className="pull-left reviews-reaction">
                    <a href="#" className="comment-like active"><i className="ti-thumb-up"></i> 12</a>
                    <a href="#" className="comment-dislike active"><i className="ti-thumb-down"></i> 1</a>
                    <a href="#" className="comment-love active"><i className="ti-heart"></i> 07</a>
                  </div>
                </div>
              </div>
              <div className="reviews-comments-item">
                <div className="review-comments-avatar">
                  <img src="https://via.placeholder.com/500x500" className="img-fluid" alt="" />
                </div>
                <div className="reviews-comments-item-text">
                  <h4><a href="#">Adam Wilsom</a><span className="reviews-comments-item-date"><i className="ti-calendar theme-cl"></i>10 Nov 2019</span></h4>

                  <div className="listing-rating"><i className="fas fa-star active"></i><i className="fas fa-star active"></i><i className="fas fa-star active"></i><i className="fas fa-star active"></i><i className="fas fa-star active"></i></div>
                  <div className="clearfix"></div>
                  <p>" Commodo est luctus eget. Proin in nunc laoreet justo volutpat blandit enim. Sem felis, ullamcorper vel aliquam non, varius eget justo. Duis quis nunc tellus sollicitudin mauris. "</p>
                  <div className="pull-left reviews-reaction">
                    <a href="#" className="comment-like active"><i className="ti-thumb-up"></i> 12</a>
                    <a href="#" className="comment-dislike active"><i className="ti-thumb-down"></i> 1</a>
                    <a href="#" className="comment-love active"><i className="ti-heart"></i> 07</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="edu_wraper">
            <h4 className="edu_title">Yorum Yaz</h4>
            <div className="review-form-box form-submit">
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Review</label>
                      <textarea className="form-control ht-140" placeholder="Review"></textarea>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <button type="submit" className="btn theme-bg btn-md">Submit Review</button>
                    </div>
                  </div>

                </div>
              </form>
            </div>
          </div>

        </div>

        <div className="col-lg-4 col-md-12 order-lg-last">

          <div className="ed_view_box style_2 stick_top">

            <div className="ed_author">
              <h2 className="theme-cl m-0">149.00 TL<span className="old_prc">299.00 TL</span></h2>
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