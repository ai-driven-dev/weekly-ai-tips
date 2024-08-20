'use server';

import { subscribeUser } from '../api/subscribeUser';
import { verifyCaptcha } from '../api/verifyCaptcha';
import { generateConfirmationEmail, sendEmail } from '../utils/sendEmail';

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

  // Subscribe the user.
  const user = await subscribeUser(data);

  if (!user) {
    throw new Error('User does not exist');
  }

  // Send confirmation email to the user.
  const confirmationEmailTemplate = generateConfirmationEmail(
    user.username,
    user.token,
  );

  return await sendEmail({
    ...confirmationEmailTemplate,
    to: user.email,
  });
}
