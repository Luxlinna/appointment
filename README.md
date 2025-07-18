# booking

A booking platform built with Next.js 15.4.1. Includes features like:

- Appointment scheduling
- Contact form with Nodemailer
- Dashboard and authentication pages

## Setup

```bash
npm install
npm run dev





# Booking System App (Next.js + Firebase)

A simple web-based booking application that allows users to book services with a doctor in a specific room, and sends email notifications upon booking.

## 🚀 Features

- User login and role-based dashboard
- Service, room, and doctor registration (admin)
- Appointment booking for clients
- Email notifications to client and company
- Firebase Firestore integration

---

## 📦 Tech Stack

- Next.js 15
- TypeScript
- Firebase (Firestore, Admin SDK)
- Tailwind CSS
- Nodemailer (for email)
- Postman/cURL (for testing API)

---

## 🛠️ Prerequisites

- Node.js v18+ or v20+
- Firebase Project
- Firebase Admin SDK JSON Key

---

## 🧰 Environment Variables

Create a `.env.local` file in the root folder with:



```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCU8Ah5MQMjId5OH61yzpMX9H3SDVnWoX8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=coworkingdb-5f036.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=coworkingdb-5f036
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=coworkingdb-5f036.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=181236012316
NEXT_PUBLIC_FIREBASE_APP_ID=1:181236012316:web:09927dc74932f864b0d6d9


# Admin SDK – Secret, used in firebaseAdmin.ts
FIREBASE_PROJECT_ID=coworkingdb-5f036,
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@coworkingdb-5f036.iam.gserviceaccount.com,
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCsNh+fyN8OniH+\nik+tyCpW5PsyNYGGtGvO8SfD4Av3tkH/swYc6j3HA5D7j0WpkHLPd/v1jlg8OYej\nN9AdavjDKrFemkcQCW5Jdh6x57eDZs8Y3mYO2lWZxYEgJcJY6gN5zOUjBSYavJfO\nOOQbZEMW09dVQZDZ5FDkTmoS++7W5fPDehYN6UeTowWhPEwOeDPY3dN0EWLjP2Oe\naBUe21Rz0dQLGqsiRsHrnAv/ac7ljiNaZkSQ2R0vzWJ9xexewCQI+B4RTdmSs0ai\nRlMkPLZ1SAkRbBMyMfZdeRR0t7ik+FJ4cmZPQkKqt5YmrDQDPpF2c9250IkAYroy\nQPhQGoY9AgMBAAECggEADFijAscZashegouy87AOjQVElxBr9VbZBdCXO71DzmIU\nMDtK/Ga0wCBa1BYs9d+jw4kEGNI4NDUhqst1Ea7aH8/fQHuKDbXHYN/linak2vhT\nb6J+KaFwkqIsxDvAx7QbRK+yW8TiOvd7YK8Gd4pEHw5X+UZGlsB+JigTBcJnGKPs\nqSCXvZN6349sB0Uy2qjeNgt+vjZwtCfodjDbyXUgmwmqVdCSliKiDTT8CCEBjt1M\nUrUDpWDVXDwVg6L3GxIckN1phCB9zhG7HKMcgZf7wNSeyJoWuwMqs2NVada4HqWn\nX/vo6oyKE9FeI19QZG1ungdqny6N8qQB4N/MFRn24QKBgQDafadMkuqBwxDJCAlS\neIfrCGKr6qih8cCDC4E85uLaTRG+SqMSFXVIxCc6RtRmpQYT1lzooVzCFRG4XTKu\n0kBo+WL0+EsNcVkr/xAhRNrJUpduKpz6U1z8lug9NikGcR5cHMZtEo9cptAGgpIh\nbfkQ3/zM+S9Nf3apR5rzLyaqEQKBgQDJxo8KosjqpQxqYgwlswyKzRCCu+86d8vU\n4Z2lAybQSK4Vnd+5mARFUeYG63+MYgxCZ6iS3NpUj/0kfVZ51cUjQ/+2nyBi/0vt\njtll8xRf5F2JJ4tvcT1wofoXHoNBpJEkLED/LaLRgl5Jj0OFiMbSNYiZ/vqU4Fsb\nP4AEzq1NbQKBgQCLpt7lGc6cTDMRW3qh5PpzJrPy0JUilaQH3rWnWKhNAg/CQnCC\noYaKkR3FqPof9YCx80UFSAZC4zalUaSQi0CyGBzBGWbXW8i0T15e9WSmY4z41HHr\nqpb3t/kPDuwf+vN9ysKlesR5YwH590Ex7tnQiGpMFUW/0iXlQyhuIYgkEQKBgGta\nDPinqyXMMlLXX4cfP+kJOWOVAa6l1fipIOqORrRCNvyhRkrEKmGHNU8xNGdIMyWR\naQraHf8nrJMhbETeC0i8AOz0tJJ3Kbp2agvnzEtIgMtcEr90DDBEvX5XaZYfLGmG\ncf5SFXJKXkfcxRvirYVhng/wrPlQdKiGnGHyZBnxAoGBAMHIc2ajy2COFipdkyHi\nRdnYqIERGiO/nDT4oTMzIeitmxS/akL3OJbEKP59ELuItdDRJNHTtb1KP4sxP00n\npBtgj8bEMfScbKh/nlQHyTJlVgA+TLmkAf1EXMh5gOB9WsGwQ+6oW9DKLr5/WFFp\nZkz4nIYMqMwYUlafTs3PNw/G\n-----END PRIVATE KEY-----\n


Mailchimp
MAILCHIMP_API_KEY=6026c2cbdd6e52535b3c43eb9a21ae8c-us22
MAILCHIMP_AUDIENCE_ID=e4597db04c
MAILCHIMP_DC=us22

MANDRILL_API_KEY=6026c2cbdd6e52535b3c43eb9a21ae8c-us22


# Gmail App Password or SMTP Credentials
EMAIL_FROM=lhvsbeauty@gmail.com
EMAIL_PASS=wrbw wppw jgbv oikg
EMAIL_TO=ylinna168@gmail.com


SECRETS.TOKEN=b'LL\xc4\xae(\xf0{\xbc\xc5\x0ca\x00\xfc\xc5\xf7\x8a\x9a4\x11,\xa3#\xe0\xc0'
CELERY_BROKER_URL=redis://localhost:6379/0

JWT_SECRET=013ccc808c25a51380855bbea8f97b1ad39ac841496fe61fa07e3d64e2ef7454















- npm install react-hot-toast firebase
- npm install react-router-dom
- npm i --save-dev @types/nodemailer
- npm install socket.io socket.io-client next
- npm install --save-dev ts-node
- npm install firebase-admin





// "dev": "next dev",
    // "build": "next build",
    // "start": "next start",










This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
