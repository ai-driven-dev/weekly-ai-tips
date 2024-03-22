interface TipEntity {
  id: string
  name: string
  shortDescription: string
  htmlContent: string
  mediaURL: string
  creationDate: Date
  updatedDate: Date
  ownerID: string
}

export type EntityTipForm = Pick<
  TipEntity,
  "name" | "shortDescription" | "htmlContent"
> & {
  id: string | null;
};

export default TipEntity
