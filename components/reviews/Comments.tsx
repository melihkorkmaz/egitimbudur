import { CommentItem } from "./CommentItem";
import { CommentType } from '../../types/comment';
import React, { useState } from "react";
import { getComments, writeComment } from "../../services/commentService";
import { NewCommentForm } from "./NewCommentForm";



type CommentsProps = {
  teacherId: string;
  userCanComment: boolean;
}

export const Comments = ({
  teacherId,
  userCanComment = false,
}: CommentsProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  
  const getTeacherComments = async () => {
    const response = await getComments(teacherId);
    setComments([...response]);
  };

  useState(() => {
    getTeacherComments();
  }, []);

  const handleNewCommentSubmit = async (comment: string) => {
      if (!comment) {
        return;
      }
      
      await writeComment(teacherId, comment);
      getTeacherComments();
  };

  return (
    <>
      <div className="list-single-main-item mb-4">
        <div className="list-single-main-item-title">
          <h3>Yorumlar</h3>
        </div>
        {comments.length === 0 ? 
          <div className="w-full text-center bold">Henuz yorum yapilmamis...</div>
          :
          <div className="reviews-comments-wrap">
            {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
          </div>
        }
      </div>
      {userCanComment ? 
        <NewCommentForm onSubmit={handleNewCommentSubmit} /> :
        <div className="p-4 mb-4 text-center bold trip text-danger bg-light-danger">
          Sadece bu ogretmenden ders almis ogrenciler yorum yapabilir.
        </div>
      }
    </>
  );
};
