import { CommentItem } from "./CommentItem";
import { CommentType } from '../../types/comment';
import { Button } from "../Button";
import { TextArea } from "../TextArea";
import React, { useState } from "react";
import { TeacherType } from "../../types/user";



type NewCommentFormProps = {
  onSubmit: (comment: string) => void;
};

const NewCommentForm = ({ onSubmit }: NewCommentFormProps) => {
  const [comment, setComment] = useState("");

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment);
  }
  
  return (
    <div className="edu_wraper">
      <h4 className="edu_title">Yorum Yaz</h4>
      <div className="review-form-box form-submit">
        <form onSubmit={handleForm}>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="form-group">
                <label>Yorum:</label>
                <TextArea value={comment} onChange={e => setComment(e.target.value)} placeHolder="Yorumunuz..." />
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="form-group">
                <Button type="submit" primary>
                  Gonder
                </Button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

type CommentsProps = {
  comments: CommentType[];
  teacherId: string;
}

export const Comments = ({
  comments,
  teacherId
}: CommentsProps) => {
  const handleNewCommentSubmit = (comment: string) => {

  };

  return (
    <>
      <div className="list-single-main-item fl-wrap">
        <div className="list-single-main-item-title fl-wrap">
          <h3>Yorumlar</h3>
        </div>
        <div className="reviews-comments-wrap">
          {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
        </div>
      </div>
      <NewCommentForm onSubmit={handleNewCommentSubmit} />
    </>
  );
};
