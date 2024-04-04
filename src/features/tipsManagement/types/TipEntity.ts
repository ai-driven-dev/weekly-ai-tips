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
   * @TODO Add tagIDs property to TipEntity
   */
}

export type TipFormType = Pick<TipEntity, "title" | "description" | "content"> & {
  id?: string;
};

export default TipEntity
