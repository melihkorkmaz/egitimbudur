import { useEffect, useState } from "react";
import { getRatings } from "../../../services/ratingService";
import { RatingForm } from "./RatingForm";
import cx from 'classnames';

type RatingOverviewProps = {
  teacherId: string;
  onRate: (rating: number) => void;
};

type RatingDetails = {
  numberOfStart: number;
  percentage: number;
  label: string;
}

export const RatingOverview = ({teacherId, onRate}: RatingOverviewProps) => {
  const [rating, setRating] = useState(0);
  const [allRatings, setAllRatings] = useState<RatingDetails[]>([]);
  
  useEffect(() => {
    const getTeacherRatings = async () => {
      const ratingDetails = await getRatings(teacherId);
      const totalRatedSum = ratingDetails.totalRated.reduce((p, c) => p + c, 0);
      setRating(ratingDetails.rating);
      
      const tempRatingArray = [] as RatingDetails[];

      for(let [index, currentRating] of ratingDetails.totalRated.entries()) {
        if (index === 1) {
          continue;
        }
        tempRatingArray.push({
          label: `${index + 1} yildiz`,
          numberOfStart: currentRating,
          percentage: (100 * currentRating) / totalRatedSum
        })
      }      
      setAllRatings(tempRatingArray.reverse());
    }

    getTeacherRatings();
  }, []);

  return (
    <div className="rating-overview mb-4">
      <RatingForm rating={rating} onRate={onRate} />

      <div className="rating-bars">
        {allRatings.map((rating, index) => (
          <div key={index} className="rating-bars-item">
            <span className="rating-bars-name">{rating.label}</span>
            <span className="rating-bars-inner">
              <span className={
                cx('rating-bars-rating', {
                  'high': index === 0,
                  'good': index === 1,
                  'mid': index === 2,
                  'poor': index === 3
                })
              } data-rating="4.7">
                <span className="rating-bars-rating-inner" style={{ width: `${rating.percentage}%` }}></span>
              </span>
              <strong>{rating.percentage.toFixed(0)}%</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
};