# Auto Paint - Backend

This is the backend server for the Auto Paint website, built with Node.js, Express, and MongoDB.

## Features

- User Authentication (JWT)
- Gallery Management
- Portfolio Management
- Contact Form Submissions
- File Uploads
- Email Notifications

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new admin user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user data

### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get single gallery item
- `POST /api/gallery` - Create gallery item (Admin)
- `PUT /api/gallery/:id` - Update gallery item (Admin)
- `DELETE /api/gallery/:id` - Delete gallery item (Admin)

### Portfolio
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/:id` - Get single portfolio item
- `POST /api/portfolio` - Create portfolio item (Admin)
- `PUT /api/portfolio/:id` - Update portfolio item (Admin)
- `DELETE /api/portfolio/:id` - Delete portfolio item (Admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (Admin)
- `PUT /api/contact/:id/status` - Update submission status (Admin)

## Environment Variables

See `.env.example` for required environment variables.

## Deployment

1. Set `NODE_ENV=production` in your `.env` file
2. Build and start the production server:
   ```bash
   npm run build
   npm start
   ```

## License

This project is licensed under the MIT License.
