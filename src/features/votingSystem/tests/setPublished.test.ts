import TipEntity from '../../tipManagement/types/TipEntity';
import { setPublished } from '../utils/setPublished';

describe('setPublished', () => {
  it('should set a tip as published', () => {
    // Arrange
    const tip: TipEntity = {
      title: 'Fake Title',
      description: 'Fake Description',
      content: 'Fake Content',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerID: 'fakeOwnerID',
      upVotes: 0,
      downVotes: 0,
      status: 'draft',
      slug: 'tip-1',
      tagIDs: ['tag1'],
    };

    // Act
    const expected: TipEntity = setPublished(tip);

    // Assert
    expect(expected.status).toEqual('published');
    expect(expected.publishedDate).not.toBeNull();
    expect(expected.publishedDate instanceof Date).toBe(true);
    expect(expected.scheduledDate).toBeNull();
  });
});
