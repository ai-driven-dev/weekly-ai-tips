export class SuggestionAlreadyExists extends Error {
  constructor(message: string = 'Suggestion already exists') {
    super(message);
    this.name = 'SuggestionAlreadyExists';
  }
}
