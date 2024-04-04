interface TipEntity {
  id: string;
  title: string;
  description: string;
  content: string;
  mediaURL: string;
  creationDate: Date;
  updatedDate: Date;
  ownerID: string;
}

export type EntityTipForm = Pick<
  TipEntity,
  "title" | "description" | "content"
> & {
  id: string | null;
};

export default TipEntity
