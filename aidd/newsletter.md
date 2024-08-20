# Newsletter in HomePage

- [Technologies used](#technologies-used)
- [Form](#form)
  - [Frontend Form Creation](#frontend-form-creation)
    - [Form Structure](#form-structure)
    - [ReCAPTCHA Integration](#recaptcha-integration)
    - [Client-Side Validation](#client-side-validation)
    - [User Experience](#user-experience)
- [Homepage Design, Layout and Copywriting](#homepage-design-layout-and-copywriting)
- [After Form submission : Frontend](#after-form-submission--frontend)
  - [Success Handling](#success-handling)
- [Form submission : Backend](#form-submission--backend)
  - [User Creation on Firestore](#user-creation-on-firestore)
- [Email](#email)
  - [Create the mailer functions](#create-the-mailer-functions)
- [Confirm user subscription](#confirm-user-subscription)
  - [Email Template](#email-template)
- [Newsletter Management](#newsletter-management)
  - [Global considerations](#global-considerations)
  - [Subscription Confirmation](#subscription-confirmation)
  - [Unsubscribe the user](#unsubscribe-the-user)

## Technologies used

- Next 14 with App Router
- Tailwind CSS
- React with Typescript
- Vercel
- Node.js
- Firebase
- Google ReCAPTCHA
- Resend API

## Form

### Frontend Form Creation

#### Form Structure

- [x] Add a form to the homepage that allows users to sign up for the newsletter.
  - [x] The form should include fields for the user's name and email address.
  - [x] The form should include a submit button.
  - [x] The form should include a ReCAPTCHA checkbox.

#### ReCAPTCHA Integration

- [x] Add ReCAPTCHA keys to the project from `NEXT_PUBLIC_RECAPTCHA_KEY` (and `RECAPTCHA_SECRET`?).

#### Client-Side Validation

We will validate the form in the Action, then change the state of the action to return an error messages array if the validation fails.

- [x] Create types.
  - [x] ErrorMessage is: message: string, type: ValidationRule
  - [x] The validation rule.
    - [x] Rule is enum: Rule.Required | Rule.Email | Rule.ReCAPTCHA
    - [x] Rule.Required: The field is required.
    - [x] Rule.Email: The field is a valid email address.
    - [x] Rule.ReCAPTCHA: The field is a valid ReCAPTCHA token.
- [x] Create a validate function that takes in the form data and returns an array of ErrorMessage.
  - [x] Params are formData: FormData
    - [x] ValidationRules: ValidationRule[]
    - [x] Each FormData field should be validated against the ValidationRules.
  - [x] The function should return an array of ErrorMessage.
- [x] Create a new "Error" component to display error messages.
  - [x] Params are: field: string, messages: ErrorMessage[] | null
  - [x] The component should render the message based on the type and field.
- [x] Add client-side validation to the form to ensure that the user's name and email address are provided.
- [x] Add client-side validation to the form to ensure that the ReCAPTCHA checkbox is checked.

#### User Experience

- [x] Add a loading spinner to the form while the submission is in progress and disable the submit button.
  - [x] It should use the `useFormStatus` from the latest version of `react-dom`.
  - [x] Use existing component named `InputWithLabel`.

## Homepage Design, Layout and Copywriting

- [x] Prompt to generate the homepage design from Vercel's v0 AI coding tool.

```text
Project Overview:
Design a minimalist, responsive landing page for a service offering free weekly AI coding tips to developers.

Design Requirements:

 1. Layout:
 • Header:
 • Headline: “Supercharge Your AI Coding – Weekly Expert Tips Delivered”
 • Subheadline: “Get practical AI coding advice every week to enhance your skills, for free.”
 • Central Form:
 • Fields: “Username” and “Email”
 • CTA Button: “Get My Weekly AI Tips”
 • Benefits Section:
 • Use bullet points:
 • “Immediate Application: Receive tips you can use right away to improve your code.”
 • “Expert Insights: Learn from AI professionals with hands-on experience.”
 • “Stay Competitive: Keep up with the latest AI advancements and trends.”
 • “Completely Free: No cost, just actionable tips sent to your inbox weekly.”
 • Trust Signal: “We respect your privacy. No spam, ever.”
 2. Visuals & Styling:
 • Typography: Use Noto Sans for text and Rokkit for titles.
 • Color Scheme: Minimalist, with a focus on a clean and professional look. Use a contrasting color for the CTA button to make it stand out.
 • Imagery: Incorporate a simple AI-related icon or illustration near the form, maintaining a minimalist style.
 • Spacing: Ensure generous white space for an uncluttered, clean design.
 3. Integration:
 • Use Next.js Server Actions to handle the form submissions securely and efficiently.

Deliverable:
A fully coded, minimalist, and visually appealing landing page ready for deployment on Vercel.

Additional Notes:
Focus on simplicity and strong emphasis on the benefits to encourage sign-ups. The design should be clean and intuitive, with an emphasis on a smooth user experience.
```

## After Form submission : Frontend

- [x] Display a toast message after form submission, if it fails or if it succeeds.

### Success Handling

- [x] Redirect the user to the `/tips` page after the form is submitted successfully.

## Form submission : Backend

### User Creation on Firestore

- [x] Create a new `subscribeUser` function to create a new user on Firestore.
- [x] The function should accept the user's name and email address.
- [x] Collection structure:
  - [x] Collection: `newsletter_subscriptions`
  - [x] Document: `user_id`
  - [x] Fields: `username`, `email`, `confirmed`,  `confirmed_at`, `unsubscribed`, `unsubscribed_at`, `created_at`, `token`
- [x] Ensure the user is not already subscribed to the newsletter before creating a new user.
- [x] Return true if the user is successfully created.
- [x] Return false if the user is already subscribed to the newsletter.

## Email

### Create the mailer functions

- [x] Use "resend" package to send the email.
- [x] Create a new generic `sendEmail` function.
  - [x] Resend API key `RESEND_KEY` from env `process.env.RESEND_KEY`
  - [x] The function should accept:
    - [x] Subject: string
    - [x] Body: HTML
    - [x] Sender: default is `noreply@ai-driven-dev.com`
    - [x] Reply-To: default is `noreply@ai-driven-dev.com`
- [x] The function should send the email to the user.
- [x] The function should return a success message.

## Confirm user subscription

### Email Template

- [x] Create a new email template for the newsletter confirmation email.
  - [x] The email should include a personalized greeting to the user:
    - [x]  "Hi [username],".
    - [x]  "Welcome to the AI Weekly Tips newsletter!"
    - [x]  "We're excited to have you on board!"
    - [x]  "Please confirm your subscription by clicking on the link below:"
    - [x]  "See you soon!"
  - [x] The email should include a link to confirm the subscription.
    - [x] The link should include the user's token.
  - [x] The email should include a link to unsubscribe from the newsletter.
    - [x] The link should include the user's token.
- [x] Subject is: `AI Weekly Tips Newsletter Confirmation`
- [x] Sender is: `noreply@ai-driven-dev.com`
- [x] Reply-To is: `noreply@ai-driven-dev.com`

## Newsletter Management

### Global considerations

- [x] Security must be handled using a secret token specific to the user.
  - [x] The token should be included in the URL to confirm the subscription.
  - [x] The token should be included in the URL to unsubscribe from the newsletter.
- [x] The endpoint redirects the user to the homepage.
- [x] A toast message should be displayed to the user if the subscription is confirmed / is not confirmed.
- [x] Use `env` to construct the URLs:
  - [x] Dev: APP_URL=<http://localhost:3000>
  - [x] Prod: APP_URL=<https://ai-driven-dev.com>

### Subscription Confirmation

- [x] Create a new endpoint that accepts GET requests to `/api/newsletter/confirm`.
  - [x] Example: `/api/newsletter/confirm?token=c796e489-afab-4b97-afbb-3b5f9c4d4689`
- [x] Based on the Next14 app router.
- [x] The endpoint should accept a query parameter `token` that identifies the user.
- [x] The endpoint should update the user's record in the database to confirm the subscription in the `newsletter_subscriptions` collection.
  - [x] Fields: `confirmed`, `confirmed_at` to fill.
  - [x] Fields: `unsubscribed`, `unsubscribed_at` to "unset".

### Unsubscribe the user

- [x] Create a new endpoint that accepts GET requests to `/api/newsletter/unsubscribe`.
  - [x] Example: `/api/newsletter/unsubscribe?token=c796e489-afab-4b97-afbb-3b5f9c4d4689`
- [x] The endpoint should accept a query parameter `token` that identifies the user.
- [x] The endpoint should unsubscribe the user from the newsletter in the `newsletter_subscriptions` collection.
  - [x] Fields: `unsubscribed`, `unsubscribed_at`
- [x] The endpoint should send a confirmation email to the user.
- [x] The endpoint should return a success message.
