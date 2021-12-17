/* eslint-disable @next/next/no-img-element */
import style from "./teacherCard.module.scss";
import cx from "classnames";
import { TeacherType } from "../types/user";
import { ServiceTypeEnum, TeacherServiceCategoryType } from "../types/common";

type TeacherCardProps = {
  asListItem?: boolean,
  teacher: TeacherType,
}

type RateInfoType = {
  rating: number;
  totalReview: number;
}

const RateInfo = ({ rating, totalReview }: RateInfoType) => (
  <div className="ed_rate_info">
    <div className="star_info">
      <i className="fas fa-star filled"></i>
      <i className="fas fa-star filled"></i>
      <i className="fas fa-star filled"></i>
      <i className="fas fa-star filled"></i>
      <i className="fas fa-star"></i>
    </div>
    <div className="review_counter">
      <strong className="high">{rating}</strong> {totalReview} Yorum
    </div>
  </div>
);

type TeacherServicePinType = {
  service: TeacherServiceCategoryType
};

const TeacherServicePin = ({ service }: TeacherServicePinType) => {
  // TODO: Move this to somewhere else
  const getServiceName = (serviceName: ServiceTypeEnum) => {
    switch (serviceName) {
      case ServiceTypeEnum.oneOfOne:
        return "1-1 Ozel Ders";
      case ServiceTypeEnum.schoolConsulting:
        return "Tercih Danismanligi";
      case ServiceTypeEnum.solvingQuestions:
        return "Soru Cozumu";
    
      default:
        return "";
    }
  }

  return (
    <div className={cx('crs_cates', {
      'cl_3': service.name === ServiceTypeEnum.oneOfOne,
      'cl_2': service.name === ServiceTypeEnum.schoolConsulting,
      'cl_4': service.name === ServiceTypeEnum.solvingQuestions,
    })}>
      <span>{getServiceName(service.name)}</span>
    </div>
  )
}

export const TeacherCard = ({ asListItem = false, teacher }: TeacherCardProps) => {
  return (
    <div className={cx({
      "crs_lt_2": asListItem
    }, style.teacherCard)}>
      {/* user image */}
      <div className={cx('authi_125', style.userImage)}>
        <div className="authi_125_thumb">
          <img
            src={teacher.profilePhoto || "/img/empty_profile_m.png"}
            className="img-fluid rounded"
            alt=""
          />
        </div>
      </div>

      {/* user info */}
      <div className={cx('ed_detail_wrap', style.userInfo)}>
        {teacher.services?.map(service => (
          <TeacherServicePin key={service.id} service={service} />
        ))}
        <div className="ed_header_caption">
          <h3 className="ed_title">{teacher.firstName} {teacher.lastName}</h3>
          <ul>
            <li>
              <i className="ti-user"></i>{teacher.numberOfStudents} Ogrenci
            </li>
            {!asListItem && <li>
              <RateInfo totalReview={teacher.totalReviews} rating={teacher.rating} />
            </li>}
          </ul>
        </div>
      </div>

      {/* price */}
      {asListItem && <h2>
        <span className="theme-cl">{teacher.basePrice}</span>
        <span className="currency ml-2">TL</span>
      </h2>}

      {/* description */}
      {asListItem && <div className={style.description}>
        <div className="ed_header_short">
          {teacher.description &&
            <p>
              {teacher.description}
              <a href="#" className="theme-cl">
                Devamini Oku..
              </a>
              .
            </p>
          }
        </div>
        <RateInfo totalReview={teacher.totalReviews} rating={teacher.rating} />
      </div>}
    </div>
  );
};
