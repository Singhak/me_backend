# me_backend API

This Node.js backend provides APIs for user authentication and profile management. It includes endpoints for user login, logout, token refresh, avatar and cover image updates, user details update, and password change functionalities.

## Technologies Used

- **Node.js**: Runtime environment for JavaScript.
- **Express**: Web framework for Node.js.
- **MongoDB/Mongoose**: Database and ORM for data storage.
- **JSON Web Tokens (JWT)**: For secure authentication.
- **Multer**: Middleware for handling multipart/form-data, used for image uploads.

## Prerequisites

- **Node.js** installed on your machine.
- **MongoDB** service configured and running.

## Installation

1. Clone the repository:

   - `git clone https://github.com/yourusername/your-repo.git`
   - `cd your-repo`

2. Install dependencies:

   - `npm install`

3. Set up environment variables:

   Create a **.env** file in the root directory with the following variables:

```
    MONGODB_URI=mongodb://localhost:27017
    PORT=8080
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=
    REFRESH_TOKEN_EXPIRY=
    CLOUDNIARY_CLOUD_NAME=
    CLOUDNIARY_API_KEY=
    CLOUDNIARY_API_SECRET=
```

4. Start the server:

   `npm start`

## Getting Started

1. Clone this repository: git clone https://github.com/Singhak/me_backend.git
2. Install dependencies: npm install
3. Set up environment variables (e.g., database connection details, secret keys).
4. Start the server: npm start

## Endpoints

- `/api/v1/users`: User-related endpoints (registration, login, profile).
- The API uses JWT (JSON Web Tokens) for authentication.
- Register a new user: POST `/api/v1/users/register`
- Log in: POST `/api/v1/users/login`
- Log out: GET `/api/v1/users/logout`
- Update user refresh token: POST `/api/v1/users/refresh-user-token`
- Update user avatar: POST `/api/v1/users/update-cover-image`
- Update user cover Image: POST `/api/v1/users/update-avatar-image`
- Update user details: POST `/api/v1/users/update-details`
- Update user password: POST `/api/v1/users/update-password`
- Include the token in the Authorization header for protected routes.

## Contact

Author: Anil Kumar
Website: https://singhak.in/

#### This project inspired from this youtube channel https://www.youtube.com/@chaiaurcode
