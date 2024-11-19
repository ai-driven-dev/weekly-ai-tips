import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import UserEntity from '../../userManagement/types/UserEntity';
import { hasUserVotedForSuggestion } from '../api/hasUserVotedForSuggestion';
import { Suggestion } from '../types/Suggestion';
import SuggestionLine from './SuggestionLine';

type Props = {
  suggestions: Suggestion[];
  user: UserEntity;
};

export default function SuggestionsList({
  suggestions,
  user,
}: Props): React.ReactElement {
  if (!suggestions.length) {
    return <p>No suggestions available</p>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suggestions.map((suggestion) => Line(suggestion))}
        </TableBody>
      </Table>
    </>
  );

  async function Line(suggestion: Suggestion) {
    const clonedSuggestion = JSON.parse(JSON.stringify(suggestion));
    const hasVoted = await hasUserVotedForSuggestion(suggestion.id, user.id);

    return (
      <SuggestionLine
        key={suggestion.id}
        suggestion={clonedSuggestion}
        hasVoted={hasVoted}
      />
    );
  }
}
