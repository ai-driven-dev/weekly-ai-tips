'use server';

import { createNewsletterSubscription } from '../api/createNewsletterSubscription';
import { verifyCaptcha } from '../api/verifyCaptcha';

export async function createNewsletterAction(
  _: boolean,
  formData: FormData,
): Promise<boolean> {
  const data = {
    email: formData.get('email') as string,
    username: formData.get('username') as string,
    public_token: formData.get('public_token') as string,
  };

  // Verify ReCAPTCHA token
  const isVerified = await verifyCaptcha(data.public_token);

  if (!isVerified) {
    throw new Error('ReCAPTCHA verification failed');
  }

  const persistedData = await createNewsletterSubscription(data);

  return persistedData;
}
