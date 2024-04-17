import TipEntity from "../../tipManagement/types/TipEntity";
import UserEntity from "../../userManagement/types/UserEntity";
import { getUserVotes } from "../api/getUserVotes";
import { vote } from "../api/vote";

jest.mock("../api/getUserVotes");
jest.mock("@/firebaseAdmin", () => ({
  db: {
    collection: jest.fn().mockImplementation(() => ({
      add: jest.fn().mockResolvedValue(true),
    })),
  },
}));
jest.mock("../../tipManagement/api/editTipVoteCounts");

describe("Voting for Tips", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should not allow a user to vote twice for the same tip", async () => {
    // Arrange
    const tipData: TipEntity = {
      id: "tip1",
      title: "Tip 1",
      description: "Description 1",
      content: "Content 1",
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerID: "user2",
      upVotes: 0,
      downVotes: 0,
      status: "ready",
    };
    const fromUser: UserEntity = {
      id: "user1",
      name: "User 1",
      email: "user1@example.com",
      roles: ["MEMBER"],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const voteType = "upvote";
    (getUserVotes as jest.Mock).mockResolvedValueOnce([{ id: "vote1" }]);

    // Act & Assert
    await expect(vote(tipData, fromUser, voteType)).rejects.toThrow(
      "User has already voted on the tip"
    );
  });

  test("should not allow a user to vote on their own tip", async () => {
    // Arrange
    const tipData: TipEntity = {
      id: "tip1",
      title: "Tip 1",
      description: "Description 1",
      content: "Content 1",
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerID: "user1",
      upVotes: 0,
      downVotes: 0,
      status: "ready",
    };
    const fromUser: UserEntity = {
      id: "user1",
      name: "User 1",
      email: "user1@example.com",
      roles: ["MEMBER"],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const voteType = "upvote";
    (getUserVotes as jest.Mock).mockResolvedValueOnce([]);

    // Act & Assert
    await expect(vote(tipData, fromUser, voteType)).rejects.toThrow(
      "User cannot vote on their own tip"
    );
  });

  test("should not allow a user to vote on a non-ready tip", async () => {
    // Arrange
    const tipData: TipEntity = {
      id: "tip1",
      title: "Tip 1",
      description: "Description 1",
      content: "Content 1",
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerID: "user2",
      upVotes: 0,
      downVotes: 0,
      status: "draft",
    };
    const fromUser: UserEntity = {
      id: "user1",
      name: "User 1",
      email: "user1@example.com",
      roles: ["MEMBER"],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const voteType = "upvote";
    (getUserVotes as jest.Mock).mockResolvedValueOnce([]);

    // Act & Assert
    await expect(vote(tipData, fromUser, voteType)).rejects.toThrow(
      "Tip is not votable!"
    );
  });

  test("should accept a user's first vote on a ready tip", async () => {
    // Arrange
    const tipData: TipEntity = {
      id: "tip1",
      title: "Tip 1",
      description: "Description 1",
      content: "Content 1",
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerID: "user2",
      upVotes: 0,
      downVotes: 0,
      status: "ready",
    };
    const fromUser: UserEntity = {
      id: "user1",
      name: "User 1",
      email: "user1@example.com",
      roles: ["MEMBER"],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const voteType = "upvote";
    (getUserVotes as jest.Mock).mockResolvedValueOnce([]);

    // Act
    const result = await vote(tipData, fromUser, voteType);

    // Assert
    expect(result).toBe(true);
  });
});
