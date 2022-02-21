/* eslint-disable @next/next/no-img-element */
import cx from "classnames";
import style from "./teacherCard.module.scss";

// COMPONENTS
import { TeacherServicePin, RatingForm } from ".";

// TYPES
import type { Teacher } from "../types";
import { Card } from "../../../components";

type TeacherCardProps = {
  asListItem?: boolean,
  teacher: Teacher,
  onClick?: (teacher: Teacher) => void;
}

export const TeacherCard = ({ asListItem = false, teacher, onClick }: TeacherCardProps) => (
  <Card className={cx({
    "cursor-pointer": onClick !== undefined,
  }, style.teacherCard)} onClick={() => onClick && onClick(teacher)}>
    {/* user image */}
    <div className={cx('authi_125', style.userImage)}>
      <div className="authi_125_thumb">
        <img
          src={teacher.photo || "/img/empty_profile_m.png"}
          className="img-fluid rounded aspect-square"
          alt=""
        />
      </div>
    </div>

    {/* user info */}
    <div className={cx('ed_detail_wrap', style.userInfo)}>
      {teacher.availableServiceTypes.map((service) => (
        <TeacherServicePin key={service.id} service={service} />
      ))}
      <div className="ed_header_caption">
        <h3 className="ed_title">{teacher.firstName} {teacher.lastName}</h3>
        <ul>
          <li>
            <i className="ti-user"></i>{teacher.numberOfStudents || 0} Ogrenci
          </li>
          {!asListItem && <li>
            <RatingForm rating={teacher.rating || 0} onRate={() => {}} >
              {(teacher.totalComments || 0).toString()} Yorum
            </RatingForm>
          </li>}
        </ul>
      </div>
    </div>

    {/* price */}
    {asListItem && <h2>
      <span className="theme-cl">{teacher.basePrice || 0}</span>
      <span className="currency ml-2">TL</span>
    </h2>}

    {/* description */}
    {asListItem && <div className={style.description}>
      <div className="ed_header_short">
        {teacher.description &&
          <p>
            {teacher.description}...
          </p>
        }
      </div>
      <RatingForm rating={teacher.rating || 0} onRate={() => {}}>
        {(teacher.totalComments || 0).toString()} Yorum
      </RatingForm>
    </div>}
  </Card>
);