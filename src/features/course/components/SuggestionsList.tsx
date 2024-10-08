import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { Suggestion } from '../types/Suggestion';

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
            <TableRow key={suggestion.id}>
              <TableCell>{suggestion.name}</TableCell>
              <TableCell>{suggestion.description}</TableCell>
              <TableCell>{suggestion.version}</TableCell>
              <TableCell>{suggestion.status}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
