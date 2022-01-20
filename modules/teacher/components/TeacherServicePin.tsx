import cx from "classnames";

// TYPES & ENUMS
import { ServiceType } from "../enums";
import type { Service } from "../types";
type TeacherServicePinType = {
  service: Service
};

export const TeacherServicePin = ({ service }: TeacherServicePinType) => (
  <div className={cx('crs_cates', {
    'cl_3': service.type === ServiceType.PRIVATE_LESSON,
    'cl_2': service.type === ServiceType.CONSULTING,
    'cl_4': service.type === ServiceType.SOLVING_QUESTION,
  })}>
    <span>{service.name}</span>
  </div>
);