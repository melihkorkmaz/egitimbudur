import commentsDummyData from '../dummyData/comments.json';
import { CommentType } from '../types/comment';

const data = {
  ...commentsDummyData
};

export const getComments = (teacherId: string): Promise<CommentType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data[teacherId] || [])
    }, 200)
  });
}

export const writeComment = async (teacherId: string, comment: string): Promise<void> => {
  const comments = await getComments(teacherId);
  return new Promise((resolve) => {
    setTimeout(() => {
      const lastComment = {
        ...comments[comments.length - 1]
      };

      lastComment.comment = comment;
      lastComment.id = (parseInt(lastComment.id) + 1).toString();

      data[teacherId].push(lastComment);
      resolve();
    }, 100)
  });
}