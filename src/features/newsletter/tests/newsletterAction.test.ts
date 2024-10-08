import 'jest-environment-jsdom';

import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { createNewsletterAction } from '../actions/NewsletterAction';
import { subscribeUser } from '../api/subscribeUser';
import { generateConfirmationEmail, sendEmail } from '../utils/sendEmail';

jest.mock('@/firebaseAdmin', () => ({
  db: jest.fn(),
}));

jest.mock('../api/verifyCaptcha', () => ({
  verifyCaptcha: jest
    .fn()
    .mockImplementation((token) => Promise.resolve(token !== 'INVALID')),
}));

jest.mock('../api/subscribeUser', () => ({
  subscribeUser: jest.fn().mockImplementation((data) => Promise.resolve(data)),
}));

jest.mock('../utils/sendEmail', () => ({
  sendEmail: jest.fn().mockResolvedValue({ id: 'mocked-email-id' }),
  generateConfirmationEmail: jest.fn(),
}));

describe('createNewsletterAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('valid data', async () => {
    const data = new FormData();
    data.append('email', 'test@example.com');
    data.append('username', 'testuser');
    data.append('public_token', 'valid_token');

    const result = await createNewsletterAction(null, data);
    expect(result).toEqual([]);
    expect(sendEmail).toHaveBeenCalled();
    expect(generateConfirmationEmail).toHaveBeenCalled();
    expect(generateConfirmationEmail).toHaveBeenCalledWith(
      'testuser',
      undefined,
    );

    expect(subscribeUser).toHaveBeenCalled();
  });

  test('invalid data', async () => {
    const data = new FormData();
    data.append('email', 'test___example.com');
    data.append('username', '');
    data.append('public_token', 'valid_token');

    const result = await createNewsletterAction(null, data);
    expect(result).toHaveLength(2);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  test('invalid token', async () => {
    const data = new FormData();
    data.append('email', 'test@example.com');
    data.append('username', 'testuser');
    data.append('public_token', 'INVALID');

    await expect(createNewsletterAction(null, data)).rejects.toThrow(
      'ReCAPTCHA verification failed',
    );
    expect(sendEmail).not.toHaveBeenCalled();
    expect(subscribeUser).not.toHaveBeenCalled();
  });
});
