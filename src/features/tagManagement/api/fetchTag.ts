import { db } from '@/firebaseAdmin';
import { TagEntity } from '../types/TagEntity';

export async function fetchTag(tagId: string): Promise<TagEntity | null> {
  const tagSnapshot = await db.collection('tags').doc(tagId).get();
  if (!tagSnapshot.exists) {
    return null;
  }
  const tagData = tagSnapshot.data() as TagEntity;
  return { ...tagData, id: tagId, usageCount: 0 };
}
