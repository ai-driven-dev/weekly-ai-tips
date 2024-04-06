interface TipEntity {
  id: string;
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
  /**
   * @TODO Add tagIds property to TipEntity
   */
  /**
   * @TODO Add scheduledDate, status, publishedDate properties to TipEntity
   */
  /**
   * @TODO Add tagIDs property to TipEntity
   */
}

export type TipFormType = Pick<
  TipEntity,
  "title" | "description" | "content"
> & {
  id?: string;
};

export default TipEntity
