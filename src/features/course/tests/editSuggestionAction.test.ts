// Import the jsdom environment for Jest
// This simulates a web browser environment in Node.js for testing
import 'jest-environment-jsdom';

// Import TextEncoder from Node.js util module
import { TextEncoder } from 'util';
import { editSuggestionAction } from '../actions/editSuggestionAction';
import { editSuggestion } from '../api/editSuggestion';
import UserEntity from '@/src/features/userManagement/types/UserEntity';
import { getCurrentUser } from '@/src/utils/firestore/getCurrentUser';

// Make TextEncoder available globally
// In browsers, TextEncoder is a global, but not in Node.js
// This line ensures TextEncoder is available in the test environment
global.TextEncoder = TextEncoder;

// Make TextDecoder available globally
// Similar to TextEncoder, this ensures TextDecoder is available
// TextDecoder is used to decode Uint8Arrays back into strings
global.TextDecoder = TextDecoder;

jest.mock('@/firebaseAdmin', () => ({
  db: jest.fn(),
}));

jest.mock('../api/editSuggestion', () => ({
  editSuggestion: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

jest.mock('@/src/utils/firestore/getCurrentUser', () => ({
  getCurrentUser: jest.fn(),
}));

describe('Suggestion Edition', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockUser: UserEntity = {
      id: '1',
      name: 'Member User',
      email: 'member@example.com',
      roles: ['MEMBER'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
  });

  it('should edit an existing suggestion', async () => {
    const mockFormData = new FormData();
    mockFormData.append('id', '123');
    mockFormData.append('name', 'Updated Name');
    mockFormData.append('description', 'Updated Description');
    mockFormData.append('version', '2.0.0');

    (editSuggestion as jest.Mock).mockResolvedValue(undefined);

    const result = await editSuggestionAction(null, mockFormData);

    expect(result).toEqual([]);
    expect(editSuggestion).toHaveBeenCalledWith({
      id: '123',
      name: 'Updated Name',
      description: 'Updated Description',
      version: '2.0.0',
    });
  });

  it('should return validation errors for invalid input', async () => {
    const mockFormData = new FormData();
    mockFormData.append('id', '123');
    mockFormData.append('name', '');
    mockFormData.append('description', 'Updated Description');
    mockFormData.append('version', '2.0.0');

    const result = await editSuggestionAction(null, mockFormData);

    expect(result).toHaveLength(1);
    expect(result?.[0].type.field).toBe('name');
    expect(editSuggestion).not.toHaveBeenCalled();
  });

  it('should handle errors from editSuggestion', async () => {
    const mockFormData = new FormData();
    mockFormData.append('id', '123');
    mockFormData.append('name', 'Updated Name');
    mockFormData.append('description', 'Updated Description');
    mockFormData.append('version', '2.0.0');

    (editSuggestion as jest.Mock).mockRejectedValue(new Error('Update failed'));

    const result = await editSuggestionAction(null, mockFormData);

    expect(result).toHaveLength(1);
    expect(result?.[0].type.field).toBe('global');
    expect(result?.[0].message).toBe('Failed to update suggestion');
  });

  it('should not allow a MEMBER user to edit a suggestion', async () => {
    const mockUser: UserEntity = {
      id: '2',
      name: 'Member User',
      email: 'member@example.com',
      roles: ['MEMBER'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

    const mockFormData = new FormData();
    mockFormData.append('id', '123');
    mockFormData.append('name', 'Updated Name');
    mockFormData.append('description', 'Updated Description');
    mockFormData.append('version', '2.0.0');

    const result = await editSuggestionAction(null, mockFormData);

    expect(result).toHaveLength(1);
    expect(result?.[0].type.field).toBe('global');
    expect(result?.[0].message).toBe(
      'User is not authorized to edit suggestions',
    );
    expect(editSuggestion).not.toHaveBeenCalled();
  });
});
