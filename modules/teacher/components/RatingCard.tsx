import React from "react";
import cx from 'classnames';

type RatingCardProps = {
  rating: number;
  children: React.ReactNode;
}

export const RatingCard = ({ rating, children }: RatingCardProps) => {
  const ratingArray = new Array(5).fill(null);

  return (
    <div className="ed_rate_info">
      <div className="star_info">
        {ratingArray.map((r, index) => (
          <i key={index} className={
            cx('fas fa-star', {
              'filled': Math.round(rating)  >= index + 1
            })
          } />
        ))}

      </div>
      <div className="review_counter">
        <strong className="high">{rating}</strong> {children}
      </div>
    </div>
  );
};