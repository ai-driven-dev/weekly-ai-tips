type UserVoteEntity = {
  userID: string;
  tipID: string;
  vote: 'upvote' | 'downvote';
};

export default UserVoteEntity;
