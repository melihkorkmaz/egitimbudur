import { useState } from "react";
import { Button } from "../Button";
import { TextArea } from "../TextArea";

type NewCommentFormProps = {
  onSubmit: (comment: string) => void;
};

export const NewCommentForm = ({ onSubmit }: NewCommentFormProps) => {
  const [comment, setComment] = useState("");

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
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