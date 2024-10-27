import { Suggestion, SuggestionGroup } from '../types/Suggestion';

/**
 * Transforms the suggestion groups to a format that the suggestion component can understand.
 *
 * @param suggestions - The suggestions to transform.
 * @returns The transformed suggestion groups.
 */
export function transformSuggestionGroups(
  suggestions: Suggestion[],
): SuggestionGroup[] {
  const suggestionGroups: SuggestionGroup[] = [];

  suggestions.forEach((suggestion) => {
    const suggestionGroupIndex = suggestionGroups.findIndex(
      (group) => group.version === suggestion.version,
    );

    if (suggestionGroupIndex === -1) {
      suggestionGroups.push({
        version: suggestion.version,
        suggestions: [suggestion],
      });
    } else {
      suggestionGroups[suggestionGroupIndex].suggestions.push(suggestion);
    }
  });

  suggestionGroups.sort((a, b) => {
    if (a.version === 'undefined') return -1;
    if (b.version === 'undefined') return 1;
    return a.version.localeCompare(b.version);
  });

  return suggestionGroups;
}
