/**
 * TagEntity is an interface that defines the structure of a tag entity.
 */
export type TagEntity = {
  id: string;
  name: string;
  description: string;
  slug: string;
  /**
   * @TODO Add tipIDs property to TagEntity
   */
};

/** 
 * @TODO create a TagFormType interface
 */
export type TagFormType = {
  id?: string;
} & Omit<TagEntity, "id">;