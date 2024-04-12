interface TipEntity {
  id?: string;
  title: string;
  description: string;
  /**
   * @TODO Add slug property based on title
   */
  content: string;
  createdAt: Date;
  updatedAt: Date;
  ownerID: string;
  upVotes: number;
  downVotes: number;
  mediaURL?: string | null;
  scheduledDate?: Date | null;
  publishedDate?: Date | null;
  status: "draft" | "ready" | "published" | "rejected" | "scheduled";
  /**
   * @TODO Add tagIDs property to TipEntity
   */
}

export type TipFormType = Pick<
  TipEntity,
  "title" | "description" | "content" | "status" | "scheduledDate"
> & {
  id?: string;
};

export default TipEntity;
