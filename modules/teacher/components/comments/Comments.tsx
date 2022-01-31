
// Components
import { CommentItem, NewCommentForm } from "../";

// Types
import type { CommentType } from "../../types";

type CommentsProps = {
  comments: CommentType[];
  userCanComment: boolean;
}

export const Comments = ({
  comments,
  userCanComment = false,
}: CommentsProps) => {

  const handleNewCommentSubmit = async (comment: string) => {
      if (!comment) {
        return;
      }
  };

  return (
    <>
      <div className="list-single-main-item mb-4">
        <div className="list-single-main-item-title">
          <h3>Yorumlar</h3>
        </div>
        {comments.length === 0 ? 
          <div className="w-full text-center bold">Henüz yorum yapılmamış...</div>
          :
          <div className="reviews-comments-wrap">
            {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
          </div>
        }
      </div>
      {userCanComment ? 
        <NewCommentForm onSubmit={handleNewCommentSubmit} /> :
        <div className="p-4 mb-4 text-center bold trip text-danger bg-light-danger">
          Sadece bu öğretmenden ders almış öğrenciler yorum yapabilir.
        </div>
      }
    </>
  );
};
