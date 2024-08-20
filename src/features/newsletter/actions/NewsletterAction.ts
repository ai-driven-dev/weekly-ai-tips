'use server';

import { ErrorMessage, Rule, validate } from '@/src/utils/formValidation';
import { subscribeUser } from '../api/subscribeUser';
import { verifyCaptcha } from '../api/verifyCaptcha';
import { generateConfirmationEmail, sendEmail } from '../utils/sendEmail';

export async function createNewsletterAction(
  _: ErrorMessage[] | null,
  formData: FormData,
): Promise<ErrorMessage[] | null> {
  const data = {
    email: formData.get('email') as string,
    username: formData.get('username') as string,
    public_token: formData.get('public_token') as string,
  };

  // Validate the form data
  const validationErrors = validate(formData, [
    { field: 'email', rule: Rule.Email },
    { field: 'email', rule: Rule.Required },
    { field: 'username', rule: Rule.Required },
    { field: 'public_token', rule: Rule.ReCAPTCHA },
  ]);

  if (validationErrors.length > 0) {
    console.error('Validation errors:', validationErrors);
    return validationErrors;
  }

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

  if (!user.confirmed) {
    // Send confirmation email to the user.
    const confirmationEmailTemplate = generateConfirmationEmail(
      user.username,
      user.token,
    );

    await sendEmail({
      ...confirmationEmailTemplate,
      to: user.email,
    });
  }

  return [];
}
