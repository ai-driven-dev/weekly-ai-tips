interface UserVoteEntity {
  id?: string;
  userID: string;
  tipID: string;
  vote: "upvote" | "downvote";
  createdAt: Date;
  updatedAt: Date;
}

export default UserVoteEntity;
