interface TipEntity {
  id?: string;
  title: string;
  description: string;
  /**
   * @TODO Add slug property based on title
   */
  content: string;
  mediaURL: string;
  creationDate: Date;
  updatedDate: Date;
  ownerID: string;
  upVotes: number;
  downVotes: number;
  /**
   * @TODO Add tagIds property to TipEntity
   */
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
