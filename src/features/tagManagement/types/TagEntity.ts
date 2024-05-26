/**
 * TagEntity is an interface that defines the structure of a tag entity.
 */
export type TagEntity = {
  id: string;
  name: string;
  description: string;
  slug: string;
  usageCount: number;
};

export type TagFormType = {
  id?: string;
} & Omit<TagEntity, 'id' | 'usageCount'>;
