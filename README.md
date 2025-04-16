
# LMS for Advanced Level Physics Tuition

A comprehensive Learning Management System designed for an Advanced Level Physics tuition teacher in Kegalle. This platform facilitates effective teaching and learning by providing tools for content management, quizzes, progress tracking, and secure access to premium features.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Learning Content Management**: Upload, organize, and manage educational materials seamlessly.
- **Freemium and Premium Features**: Access free content and unlock premium features via subscription.
- **Payment Integration**: Secure transactions using the PayHere payment gateway.
- **Quiz Management**: Create quizzes and set specific time periods for availability, fully synchronized.
- **Student Progress Tracking**: Monitor individual student progress for personalized insights.
- **Secure Authentication**: Protected routes on both frontend and backend with token management via cookies and refresh tokens.
- **Responsive Design**: Intuitive interface built with React and styled with Tailwind CSS.

---

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MySQL (Normalized Schema)
- **Authentication**: JWT with Refresh Tokens (Cookie-based)
- **Payment Gateway**: PayHere

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL database
- PayHere account for payment integration

### Backend Setup

1. Navigate to the `backend` directory.
2. Install dependencies: `npm install` or `yarn install`
3. Set up environment variables in a `.env` file:
   - `DATABASE_URL`: MySQL connection string (e.g., `mysql://user:password@host:port/dbname`)
   - `JWT_SECRET`: Secret key for JWT authentication
   - `PAYHERE_MERCHANT_ID`: Your PayHere merchant ID
   - `PAYHERE_SECRET`: Your PayHere secret key
   - `PORT`: Port number for the server (default: 5000)
4. Run database migrations: `npm run migrate` (if applicable)
5. Start the server: `npm start` or `yarn start`

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install` or `yarn install`
3. Set up environment variables in a `.env` file:
   - `REACT_APP_API_URL`: URL of the backend API (e.g., `http://localhost:5000`)
4. Start the development server: `npm start` or `yarn start`

After starting both servers, access the application at `http://localhost:3000`.

---

## Usage

### For Teachers

- **Content Management**: Upload and organize learning materials in the dashboard.
- **Quiz Creation**: Add quizzes and define availability periods with synchronized scheduling.
- **Progress Tracking**: Track each student's progress and gain insights into their performance.

### For Students

- **Access Content**: Explore free and premium learning materials.
- **Take Quizzes**: Participate in quizzes during their available time periods.
- **Track Progress**: Monitor personal learning progress.

---

## Project Structure

```plaintext
├── backend/
│   ├── config/             # Database and other configurations
│   ├── controllers/        # API logic
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication and other middleware
│   ├── .env                # Environment variables
│   └── server.js           # Main server file
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Tailwind CSS or other styles
│   │   └── ...             # Other frontend code
│   ├── .env                # Environment variables
│   └── package.json        # Frontend dependencies
├── README.md
└── ...
```





## Contact

For inquiries or support, please contact:

- **Email**: dasunpramodya616@gmail.com
- **GitHub**: IllangasingheIMDP
