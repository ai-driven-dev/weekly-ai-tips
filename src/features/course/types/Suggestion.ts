export type SuggestionForm = Omit<Suggestion, 'id'>;

export interface Suggestion {
  id: string;
  name: string;
  description: string;
  upVotes: number;
  version: string | 'undefined';
  status: 'Pending' | 'In Progress' | 'Approved' | 'Rejected';
  /** User ID who created the suggestion */
  createdBy: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface SuggestionGroup {
  version: Suggestion['version'];
  suggestions: Suggestion[];
}
