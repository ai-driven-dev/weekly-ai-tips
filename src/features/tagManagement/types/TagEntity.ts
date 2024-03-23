/**
 * TagEntity is an interface that defines the structure of a tag entity.
 */
export default interface TagEntity {
  id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

