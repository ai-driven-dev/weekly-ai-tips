import TipEntity from '../../tipManagement/types/TipEntity';
import UserEntity from '../../userManagement/types/UserEntity';
import { getUserVotes } from '../api/getUserVotes';
import { vote } from '../api/vote';

// Constants for reuse in tests
const TIP_ID = 'tip1';
const USER_ID = 'user1';
const VOTE_TYPE_UPVOTE = 'upvote';
const ERROR_USER_ALREADY_VOTED = 'User has already voted on the tip';
const ERROR_USER_OWN_TIP = 'User cannot vote on their own tip';
const ERROR_TIP_NOT_VOTABLE = 'Tip is not votable!';

// Simplified mock setup
jest.mock('../api/getUserVotes');
jest.mock('@/firebaseAdmin', () => ({
  db: {
    collection: jest.fn().mockImplementation(() => ({
      add: jest.fn().mockResolvedValue(true),
    })),
  },
}));
jest.mock('../../tipManagement/api/editTipVoteCounts');

describe('Voting for Tips', () => {
  let tipData: TipEntity;
  let fromUser: UserEntity;

  beforeEach(() => {
    jest.clearAllMocks();

    // Common test data setup
    tipData = {
      id: TIP_ID,
      title: 'Tip 1',
      description: 'Description 1',
      content: 'Content 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerID: 'user2', // Default to a different user
      upVotes: 0,
      downVotes: 0,
      status: 'ready',
      slug: 'tip-1',
      tagIDs: ['tag1'],
    };

    fromUser = {
      id: USER_ID,
      name: 'User 1',
      email: 'user1@example.com',
      roles: ['MEMBER'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  test('should not allow a user to vote twice for the same tip', async () => {
    // Mock setup for this test
    (getUserVotes as jest.Mock).mockResolvedValueOnce([{ id: 'vote1' }]);

    // Attempt to vote
    await expect(vote(tipData, fromUser, VOTE_TYPE_UPVOTE)).rejects.toThrow(
      ERROR_USER_ALREADY_VOTED,
    );
  });

  test('should not allow a user to vote on their own tip', async () => {
    // Adjusting tip owner to simulate user's own tip
    tipData.ownerID = USER_ID;
    (getUserVotes as jest.Mock).mockResolvedValueOnce([]);

    await expect(vote(tipData, fromUser, VOTE_TYPE_UPVOTE)).rejects.toThrow(
      ERROR_USER_OWN_TIP,
    );
  });

  test('should not allow a user to vote on a non-ready tip', async () => {
    // Adjusting tip status to simulate non-votable condition
    tipData.status = 'draft';
    (getUserVotes as jest.Mock).mockResolvedValueOnce([]);

    await expect(vote(tipData, fromUser, VOTE_TYPE_UPVOTE)).rejects.toThrow(
      ERROR_TIP_NOT_VOTABLE,
    );
  });

  // eslint-disable-next-line @typescript-eslint/quotes
  test("should accept a user's first vote on a ready tip", async () => {
    // Default mock setup applies
    (getUserVotes as jest.Mock).mockResolvedValueOnce([]);

    const result = await vote(tipData, fromUser, VOTE_TYPE_UPVOTE);
    expect(result).toBe(true);
  });
});
