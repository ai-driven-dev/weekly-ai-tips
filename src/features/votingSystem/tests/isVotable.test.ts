import TipEntity from '../../tipManagement/types/TipEntity';
import isVotable from '../utils/isVotable';

describe('isVotable', () => {
  it('can vote for a tip that has "ready" status', () => {
    const tip: TipEntity = {
      title: 'Test',
      description: 'Test',
      content: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerID: '1',
      upVotes: 0,
      downVotes: 0,
      status: 'ready',
      slug: 'tip-1',
      tagIDs: ['tag1'],
    };

    const result = isVotable(tip);

    expect(result).toBe(true);
  });

  it('cannot vote for a tip that has status “draft”', () => {
    const tip: TipEntity = {
      title: 'Test',
      description: 'Test',
      content: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerID: '1',
      upVotes: 0,
      downVotes: 0,
      status: 'draft',
      slug: 'tip-1',
      tagIDs: ['tag1'],
    };

    const result = isVotable(tip);

    expect(result).toBe(false);
  });

  it('can vote if downVotes > -3 or upVotes < 3', () => {
    const tip: TipEntity = {
      title: 'Test',
      description: 'Test',
      content: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerID: '1',
      upVotes: 2,
      downVotes: -2,
      status: 'ready',
      slug: 'tip-1',
      tagIDs: ['tag1'],
    };

    const result = isVotable(tip);

    expect(result).toBe(true);
  });

  it('cannot vote if downVotes < -3 and upVotes < 3', () => {
    const tip: TipEntity = {
      title: 'Test',
      description: 'Test',
      content: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerID: '1',
      upVotes: 2,
      downVotes: -4,
      status: 'ready',
      slug: 'tip-1',
      tagIDs: ['tag1'],
    };

    const result = isVotable(tip);

    expect(result).toBe(false);
  });
});
