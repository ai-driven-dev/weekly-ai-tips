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
  - [Email Handling](#email-handling)
- [Email](#email)
  - [Create the mailer functions](#create-the-mailer-functions)
- [Newsletter Management](#newsletter-management)
  - [Security](#security)
- [Confirm user subscription](#confirm-user-subscription)
  - [Email Template](#email-template)
  - [Endpoint Creation](#endpoint-creation)
  - [Unsubscribe the user](#unsubscribe-the-user)
    - [Endpoint Creation](#endpoint-creation-1)

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

- [ ] Create a new "Error" component to display error messages.
  - [ ] Params are: key: string, messages: ErrorMessage[]
  - [ ] ErrorMessage is: message: string, type: ErrorType
  - [ ] ErrorType is: ErrorType.Required | ErrorType.InvalidEmail | ErrorType.ReCAPTCHA
  - [ ] The component should render the message based on the type and key.
- [ ] Add client-side validation to the form to ensure that the user's name and email address are provided.
- [ ] Add client-side validation to the form to ensure that the ReCAPTCHA checkbox is checked.

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

### Email Handling

- [ ] The endpoint should send a confirmation email to the user.
- [ ] The endpoint should return a success message.

## Email

### Create the mailer functions

- [ ] Create a new function that sends the newsletter email using Resend API.
  - [ ] The function should accept the user's name and email address.
  - [ ] The function should send the email to the user.
  - [ ] The function should return a success message.

## Newsletter Management

### Security

- [ ] Security must be handled using a secret token specific to the user.
  - [ ] The token should be included in the URL to confirm the subscription.
  - [ ] The token should be included in the URL to unsubscribe from the newsletter.

## Confirm user subscription

### Email Template

- [ ] Create a new email template for the newsletter confirmation email.
  - [ ] The email should include a personalized greeting to the user.
  - [ ] The email should include a link to confirm the subscription.
  - [ ] The email should include a link to unsubscribe from the newsletter.

### Endpoint Creation

- [ ] Create a new endpoint that accepts GET requests to `/api/newsletter/confirm`.
  - [ ] The endpoint should accept a query parameter `token` that identifies the user.
  - [ ] The endpoint should update the user's record in the database to confirm the subscription in the `newsletter_subscriptions` collection.
    - [ ] Fields: `confirmed`, `confirmed_at` to fill.
    - [ ] Fields: `unsubscribed`, `unsubscribed_at` to "unset".

### Unsubscribe the user

#### Endpoint Creation

- [ ] Create a new endpoint that accepts GET requests to `/api/newsletter/unsubscribe`.
- [ ] The endpoint should accept a query parameter `token` that identifies the user.
- [ ] The endpoint should unsubscribe the user from the newsletter in the `newsletter_subscriptions` collection.
  - [ ] Fields: `unsubscribed`, `unsubscribed_at`
- [ ] The endpoint should send a confirmation email to the user.
- [ ] The endpoint should return a success message.
