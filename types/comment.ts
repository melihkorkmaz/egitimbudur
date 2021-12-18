
export type UserWithPhoto = {
  id: string;
  photo: string;
  firstName: string;
  lastName: string;
}

export type CommentType = {
  id: string;
  owner: UserWithPhoto;
  comment: string;
  likes: number;
  dislikes: number;
  dateCommented: number;
}