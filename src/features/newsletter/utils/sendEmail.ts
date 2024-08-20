import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

interface EmailContent {
  subject: string;
  body: string;
}

type SendEmailParams = EmailContent & {
  to: string;
  sender?: string;
  replyTo?: string;
};

export function generateConfirmationEmail(
  username: string,
  token: string,
): EmailContent {
  const subject = 'AI Weekly Tips Newsletter Confirmation';
  const body = `
    <p>Hi ${username},</p>
    <p>Welcome to the AI Weekly Tips newsletter!</p>
    <p>We're excited to have you on board!</p>
    <p>Please confirm your subscription by clicking on the link below:</p>
    <p><a href="https://yourdomain.com/api/newsletter/confirm?token=${token}">Confirm Subscription</a></p>
    <p>See you soon!</p>
    <p>If you did not subscribe to this newsletter, you can unsubscribe by clicking the link below:</p>
    <p><a href="https://yourdomain.com/api/newsletter/unsubscribe?token=${token}">Unsubscribe</a></p>
  `;
  return { subject, body };
}

export async function sendEmail({
  subject,
  body,
  to,
  sender = 'noreply@ai-driven-dev.com',
  replyTo = 'noreply@ai-driven-dev.com',
}: SendEmailParams): Promise<boolean> {
  const response = await resend.emails.send({
    from: sender,
    to,
    subject,
    html: body,
    replyTo,
  });

  return !!response.data?.id;
}
