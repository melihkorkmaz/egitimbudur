import { ServiceTypeEnum } from "../types/common";

export const getServiceName = (name: ServiceTypeEnum) => {
  switch (name) {
    case ServiceTypeEnum.oneOfOne:
      return '1-1 Ozel Ders';
    case ServiceTypeEnum.solvingQuestions:
      return 'Soru Cozumu';
    case ServiceTypeEnum.schoolConsulting:
      return 'Terchi Danismanlığı';
    default:
      return '';
  }
}