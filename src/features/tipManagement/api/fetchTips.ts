import { db } from "@/firebaseAdmin";
import TipEntity from "../types/TipEntity";
import { getStatus } from "../utils/tipUtils";

export async function fetchTips(
  status?: TipEntity["status"]
): Promise<Array<TipEntity>> {
  let tipsCollection = db.collection("tips");
  let votesCollection = db.collection("votes");

  if (!tipsCollection) {
    throw new Error("Failed to fetch tips collection from database");
  }

  let snapshot = null;

  if (status) {
    snapshot = await tipsCollection.where("status", "==", status).get();
  } else {
    snapshot = await tipsCollection.get();
  }

  const tips: Array<TipEntity> = [];

  for (let doc of snapshot.docs) {
    const tip = doc.data();
    const votesSnapshot = await votesCollection
      .where("tipID", "==", doc.id)
      .get();
    let upVotes = 0;
    let downVotes = 0;

    votesSnapshot.forEach((voteDoc) => {
      const vote = voteDoc.data();
      if (vote.vote === "upvote") {
        upVotes += 1;
      } else if (vote.vote === "downvote") {
        downVotes += 1;
      }
    });

    tips.push({
      id: doc.id,
      title: tip.title,
      description: tip.description,
      content: tip.content,
      mediaURL: tip.mediaURL,
      creationDate: tip.creationDate?.toDate(),
      updatedDate: tip.updatedDate?.toDate(),
      ownerID: tip?.ownerID,
      upVotes,
      downVotes,
      status: getStatus({ upVotes, downVotes }),
      // @TODO get tags, scheduledDate, publishedDate
    });
  }

  return tips;
}
