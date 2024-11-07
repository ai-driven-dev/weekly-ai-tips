import { Suggestion } from '../types/Suggestion';
import { transformSuggestionGroups } from '../utils/transformSuggestionGroups';

describe('transformSuggestionGroups', () => {
  test('should return an empty array when no suggestions are provided', () => {
    const suggestions: Suggestion[] = [];
    const result = transformSuggestionGroups(suggestions);
    expect(result).toEqual([]);
  });

  test('should group a single suggestion correctly', () => {
    const suggestions: Suggestion[] = [
      {
        id: '1',
        name: 'Suggestion 1',
        description: 'Description 1',
        upVotes: [],
        version: '1.0.0',
        status: 'Pending',
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const result = transformSuggestionGroups(suggestions);
    expect(result).toEqual([
      {
        version: '1.0.0',
        suggestions: [suggestions[0]],
      },
    ]);
  });

  test('should group multiple suggestions with the same version', () => {
    const suggestions: Suggestion[] = [
      {
        id: '1',
        name: 'Suggestion 1',
        description: 'Description 1',
        upVotes: [],
        version: '1.0.0',
        status: 'Pending',
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Suggestion 2',
        description: 'Description 2',
        upVotes: [],
        version: '1.0.0',
        status: 'Approved',
        createdBy: 'user2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const result = transformSuggestionGroups(suggestions);
    expect(result).toEqual([
      {
        version: '1.0.0',
        suggestions: [suggestions[0], suggestions[1]],
      },
    ]);
  });

  test('should group multiple suggestions with different versions', () => {
    const suggestions: Suggestion[] = [
      {
        id: '1',
        name: 'Suggestion 1',
        description: 'Description 1',
        upVotes: [],
        version: '1.0.0',
        status: 'Pending',
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Suggestion 2',
        description: 'Description 2',
        upVotes: [],
        version: '2.0.0',
        status: 'Approved',
        createdBy: 'user2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const result = transformSuggestionGroups(suggestions);
    expect(result).toEqual([
      {
        version: '1.0.0',
        suggestions: [suggestions[0]],
      },
      {
        version: '2.0.0',
        suggestions: [suggestions[1]],
      },
    ]);
  });
});
