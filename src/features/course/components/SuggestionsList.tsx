import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { Suggestion } from '../types/Suggestion';
import SuggestionLine from './SuggestionLine';

type Props = {
  suggestions: Suggestion[];
};

export default function SuggestionsList(props: Props): React.ReactElement {
  if (!props.suggestions.length) {
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
          {props.suggestions.map((suggestion) => (
            <SuggestionLine
              key={suggestion.id}
              suggestion={JSON.parse(JSON.stringify(suggestion))}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
