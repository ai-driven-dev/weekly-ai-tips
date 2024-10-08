# User-Story: Submitting Suggestions

As a User, I want to submit new course suggestions so that I can propose courses that interest me.

## Feature 1: Suggestion Submission Form

### Data Models

- [x] Create `Suggestion.ts` type file.
  - [x] Fields: `name`, `description`, `status` (default: "pending"), `version`, `upVotes`, `createdBy`, `createdAt`, `updatedAt`.

### Form

- [x] Base on `Newsletter/` folder, create a new Form Action to handle form submissions.
- [x] Create a Next React Form Action to handle form submissions.
  - [x] Use the `useForm` hook to manage form state.
- [x] Create toast message (e.g., "Thank you! Your suggestion is awaiting validation").

#### Form UI

- [x] Create input fields for:
  - [x] Course Name (required)
  - [x] Course Description (required)
- [x] Add a "Submit Suggestion" button.

### Form Submission

- [x] Create a new function `createSuggestion` to handle form submissions.
  - [x] Use `subscribeUser` function as example to persist the suggestion in the database.

## Feature 2: Display Suggestions in a Table

### Group Display

- [ ] A Toggle Group component to display the suggestions in a table with titles per version.
  - [ ] The title is toggle-able.
- [ ] In this group there is the table display.
- [ ] The group is determined by "version" (eg. 1.1, 1.x, 2.0, etc.).
  - [ ] If version is not defined, display the table with title "Suggestions".

### Table Display

- [ ] Create a table to display submitted suggestions with the following columns:
  - `Name`
  - `Description`
  - `Status`
  - Action (contains a "Edit" and a "Delete" button)
  
### Table Line

- [ ] Toggling Edit button make fields editable.
  - [ ] It becomes a "Save Button"
  - [ ] On Save, the suggestion is updated in the database.
    - [ ] Create a Next React Form Action to handle form submissions.
      - [ ] Use the `useForm` hook to manage form state.
- [ ] Toggling Delete button deletes the suggestion.
