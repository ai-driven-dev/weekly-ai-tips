import Title from '@/src/components/ui/title';
import { fetchSuggestions } from '@/src/features/course/api/fetchSuggestions';
import SuggestionForm from '@/src/features/course/components/SuggestionForm';
import SuggestionsList from '@/src/features/course/components/SuggestionsList';
import { transformSuggestionGroups } from '@/src/features/course/utils/transformSuggestionGroups';

export default async function Roadmap() {
  const suggestions = await fetchSuggestions();
  const suggestionGroups = transformSuggestionGroups(suggestions);

  return (
    <div>
      <Title>Roadmap</Title>
      <SuggestionForm />
      {suggestionGroups.map((group, index) => (
        <details key={`SuggestionGroup-${group.version}-${index}`}>
          <summary>
            {group.version === 'undefined' ? 'Suggestions' : group.version}
          </summary>
          <SuggestionsList suggestions={group.suggestions} />
        </details>
      ))}
    </div>
  );
}
