import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';
type RatingFormProps = {
  rating: number;
  onRate: (rating: number) => void;
  children?: React.ReactNode;
}
export const RatingForm = ({ rating, onRate, children }: RatingFormProps) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const ratingArray = new Array(5).fill(null);
  const starRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = (e: MouseEvent) => {
    const currentRatingElement = e.target as HTMLElement;
    const value = parseInt(currentRatingElement.id);

    if (starRef.current?.contains(currentRatingElement) && !isNaN(value)) {
      setCurrentRating(value);
    } else if (currentRating !== rating) {
      setCurrentRating(rating);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, currentRating]);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating])

  return (
    // <div className="rating-overview-box">
    //   <div ref={starRef} className="star-rating" data-rating="5">
    //     {ratingArray.map((r, index) => (
    //       <i id={(index + 1).toString()} onClick={() => onRate(index + 1)} key={index} className={
    //         cx('fas fa-star cursor-pointer', {
    //           'filled': Math.round(currentRating) >= index + 1
    //         })
    //       } />
    //     ))}
    //   </div>
    //   <div className="review_counter">
    //     <strong className="high">{rating}</strong> {children}
    //   </div>
    // </div>

    <div className="ed_rate_info">
      <div ref={starRef} className="star_info">
        {ratingArray.map((r, index) => (
          <i id={(index + 1).toString()} onClick={() => onRate(index + 1)} key={index} className={
            cx('fas fa-star cursor-pointer', {
              'filled': Math.round(currentRating) >= index + 1
            })
          } />
        ))}
      </div>
      <div className="review_counter">
        <strong className="high">{rating}</strong> {children}
      </div>
    </div>
  );
}