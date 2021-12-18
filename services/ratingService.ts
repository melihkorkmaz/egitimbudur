import ratingDummy from '../dummyData/ratingDetails.json';
import { RateOverviewType } from '../types/common';

export const getRatings = (teacherId: string): Promise<RateOverviewType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ratingDummy[teacherId] as RateOverviewType);
    }, 200);
  });
}