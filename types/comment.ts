
export type UserWithPhoto = {
  id: string;
  photo: string;
  fullName: string;
}

export type CommentType = {
  id: string;
  owner: UserWithPhoto;
  comment: string;
  likes: number;
  dislikes: number;
  dateCommented: Date;
}