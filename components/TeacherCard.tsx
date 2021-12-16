import style from "./teacherCard.module.scss";
import cx from "classnames";

type TeacherCardProps = {
  asListItem?: boolean,
}

const RateInfo = () => (
  <div className="ed_rate_info">
    <div className="star_info">
      <i className="fas fa-star filled"></i>
      <i className="fas fa-star filled"></i>
      <i className="fas fa-star filled"></i>
      <i className="fas fa-star filled"></i>
      <i className="fas fa-star"></i>
    </div>
    <div className="review_counter">
      <strong className="high">4.7</strong> 3572 Yorum
          </div>
  </div>
);

export const TeacherCard = ({ asListItem = false }: TeacherCardProps) => {
  return (
    <div className={cx({
      "crs_lt_2": asListItem
    }, style.teacherCard)}>
      {/* user image */}
      <div className={cx('authi_125', style.userImage)}>
        <div className="authi_125_thumb">
          <img
            src="https://randomuser.me/api/portraits/men/73.jpg"
            className="img-fluid rounded"
            alt=""
          />
        </div>
      </div>

      {/* user info */}
      <div className={cx('ed_detail_wrap', style.userInfo)}>
        <div className="crs_cates cl_3">
          <span>1-1 Ozel Ders</span>
        </div>
        <div className="crs_cates cl_2">
          <span>Soru Cozumu</span>
        </div>
        <div className="crs_cates cl_4">
          <span>Tercih Danismanligi</span>
        </div>
        <div className="ed_header_caption">
          <h3 className="ed_title">Ahmet Mumtaz Taylan</h3>
          <ul>
            <li>
              <i className="ti-user"></i>52 Ogrenci
            </li>
            {!asListItem && <li>
              <RateInfo />
            </li>}
          </ul>
        </div>
      </div>

      {/* price */}
      {asListItem && <h2>
        <span className="theme-cl">149</span>
        <span className="currency ml-2">TL</span>
      </h2>}

      {/* description */}
      {asListItem &&<div className={style.description}>
         <div className="ed_header_short">
          <p>
            Excepteur sint occaecat cupidatat non proident, deserunt mollit anim
            id est laborum. accusantium doloremque laudantium,vitae dicta{" "}
            <a href="#" className="theme-cl">
              Devamini Oku..
            </a>
            .
          </p>
        </div>
        <RateInfo/>

      </div>}
    </div>
  );
};
