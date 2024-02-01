# AI Weekly tips

A personal project to demo AI usage for software engineers!

> ⚠️ Minimum 50% of the project's code has been generated using AI.

## Getting Started

Make the project run locally.

### Prerequisites

- Git
- Node.js (v18+)
- A text editor like Zed or VSCode

## Installation

Clone the Repository

```bash
git clone https://github.com/alexsoyes/weekly-ai-tips
```

Then install the dependencies:

```bash  
cd weekly-ai-tips/
```

Install Dependencies:

```bash
npx husky-init && npm install    
```

## Environment Configuration

Copy the example environment variable file and prepare yourself to fill it!

```bash
cp -v .env.example .env.local
```

## Project Configuration

### Firebase Console (for Most Credentials)

Go to the Firebase Console: [Firebase Console](https://console.firebase.google.com/).

#### Select Your Project

Click on your project (e.g., weekly-ai-tips).

#### Access Project Settings

Click the gear icon next to 'Project Overview' to go to 'Project settings'.

#### Find Your Credentials

In the 'General' tab, scroll down to 'Your apps', and select the appropriate app (Web, iOS, Android, etc.).  
Here you'll find most of your Firebase credentials:

- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN  
- FIREBASE_PROJECT_ID
- FIREBASE_STORAGE_BUCKET
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_APP_ID

These values are located under 'Firebase SDK snippet', usually provided as a configuration object.

### Google Cloud Console (for Service Account Credentials)

Go to [Google Cloud Console](https://console.cloud.google.com/).

#### Access IAM & Admin

Navigate to 'IAM & Admin' > 'Service Accounts'.  

#### Select Your Project from the console

Make sure your Firebase project (weekly-ai-tips) is selected.

#### Find Service Account

Locate your service account. It might be one created by Firebase or a custom one you've made.

Click on the service account to view details.  

#### Service Account Key

Under the 'Keys' tab, you can generate a new private key if you don't already have one.  
Downloading the key will give you a JSON file containing `private_key` and `client_email`. These are your `FIREBASE_PRIVATE_KEY` and `FIREBASE_CLIENT_EMAIL`.

## Run the Application Locally

```bash
npm run dev
```

The application should now be running on <http://localhost:3000>.

## Authors

- [alex so yes](https://alexsoyes.com) - Initial work - [@alexsoyes](https://twitter.com/alexsoyes)

## License

This project is licensed under the [LICENSE_NAME](LICENSE.md) License - see the [LICENSE.md](LICENSE.md) file for details.
