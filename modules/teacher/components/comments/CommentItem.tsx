/* eslint-disable @next/next/no-img-element */
import { CommentType } from '../../../../types/comment';

type CommentProps = {
  comment: CommentType;
};

export const CommentItem = ({ comment }: CommentProps) => (
  <div className="reviews-comments-item">
      <div className="review-comments-avatar">
        <img src={comment.owner.photo} className="img-fluid" alt="" />
      </div>
      <div className="reviews-comments-item-text">
        <h4>
          <a href="#">{comment.owner.firstName} {comment.owner.lastName}</a>
          <span className="reviews-comments-item-date"><i className="ti-calendar theme-cl"></i>{(new Date(comment.dateCommented).toLocaleDateString())}</span>
        </h4>
        <div className="clearfix"></div>
        <p>
          {comment.comment}
        </p>
        <div className="pull-left reviews-reaction">
          <a href="#" className="comment-like active"><i className="ti-thumb-up"></i> {comment.likes}</a>
          <a href="#" className="comment-dislike active"><i className="ti-thumb-down"></i> {comment.dislikes}</a>
        </div>
      </div>
    </div>
);