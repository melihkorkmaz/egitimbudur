import axios from 'axios';
import commentsDummyData from '../../dummyData/comments.json';
import { CommentType } from '../../types/comment';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const data = {
  ...commentsDummyData
};

export const getComments = async (userId: string) => {
  const url = `${apiUrl}/getTeacherComments?teacherId=${userId}`;
  const res = await axios.get(url);
  return res.data as CommentType[];
};

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