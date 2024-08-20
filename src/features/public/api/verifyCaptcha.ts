export const GOOGLE_RECAPTCHA_URL =
  'https://www.google.com/recaptcha/api/siteverify';

/**
 * Verify ReCAPTCHA token.
 * This function sends a POST request to the Google ReCAPTCHA API to verify the token.
 *
 * @param {recaptchaToken} recaptchaToken - The ReCAPTCHA token to be verified.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the verification status.
 */
export async function verifyCaptcha(recaptchaToken: string): Promise<boolean> {
  // Verify ReCAPTCHA token
  const recaptchaResponse = await fetch(GOOGLE_RECAPTCHA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`,
  });

  // Parse ReCAPTCHA response
  const recaptchaData = await recaptchaResponse.json();

  return recaptchaData.success;
}
