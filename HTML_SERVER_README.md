# Standalone HTML Portfolio Server

This is a pure HTML version of the portfolio website with a Node.js/Express backend for the contact form.

## Files

- `public/index.html` - Complete standalone HTML portfolio with inline CSS and JavaScript
- `server.js` - Express server with contact form API endpoint
- `public/images/image.png` - Profile photo

## Setup

1. Install dependencies:
\`\`\`bash
npm install
# or
pnpm install
# or
yarn install
\`\`\`

The required dependencies (express and cors) are already in package.json.

## Running the HTML Server

To run the standalone HTML server:

\`\`\`bash
npm run server
\`\`\`

The server will start on `http://localhost:3000`

## Features

### Frontend (HTML)
- Pure HTML/CSS/JavaScript (no build step required)
- All styling is inline in the HTML file
- Smooth scroll animations
- Responsive design
- Form validation
- Fetch API for form submission

### Backend (Node.js/Express)
- `/api/contact` POST endpoint for form submissions
- Input validation
- CORS enabled
- Error handling
- Console logging of submissions

## Extending the Backend

The contact form endpoint in `server.js` currently logs submissions to the console. You can extend it to:

1. **Send emails** using nodemailer:
\`\`\`javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'anohquantum@gmail.com',
  subject: `Portfolio Contact: ${name}`,
  text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  replyTo: email
});
\`\`\`

2. **Save to database** (MongoDB, PostgreSQL, etc.)
3. **Send to CRM** (HubSpot, Salesforce, etc.)
4. **Trigger webhooks** or notifications

## Environment Variables

Create a `.env` file if you need environment variables:

\`\`\`
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
\`\`\`

Then use them in server.js with:
\`\`\`javascript
require('dotenv').config();
\`\`\`

## Differences from Next.js Version

- **No build step**: The HTML version runs directly in the browser
- **No React**: Pure vanilla JavaScript
- **All-in-one file**: Entire website is in one HTML file with inline styles
- **Simple backend**: Basic Express server instead of Next.js API routes
- **Same design**: Identical visual appearance and animations

## Deployment

### Deploy the HTML version to any static hosting:
- Copy `public/index.html` and `public/images/` to your host
- The backend can be deployed separately to Heroku, Railway, or any Node.js host

### Deploy the backend:
- Deploy `server.js` to a Node.js hosting provider
- Update the form fetch URL in the HTML to point to your backend URL

### Deploy together:
- Deploy the entire project to Vercel, Netlify, or Heroku
- The Express server will serve both the static HTML and handle API requests
