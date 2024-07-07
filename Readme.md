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

   `MONGODB_URI=mongodb://localhost:27017
PORT=8080
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
CLOUDNIARY_CLOUD_NAME=
CLOUDNIARY_API_KEY=
CLOUDNIARY_API_SECRET=`

4. Start the server:

   `npm start`

## Getting Started

1. Clone this repository: git clone https://github.com/Singhak/me_backend.git
2. Install dependencies: npm install
3. Set up environment variables (e.g., database connection details, secret keys).
4. Start the server: npm start

## Endpoints

- **/api/v1/users:** User-related endpoints (registration, login, profile).
- The API uses JWT (JSON Web Tokens) for authentication.
- Register a new user: POST _/api/v1/users/register_
- Log in: POST _/api/v1/users/login_
- Log out: GET _/api/v1/users/logout_
- Update user refresh token: POST _/api/v1/users/refresh-user-token_
- Update user avatar: POST _/api/v1/users/update-cover-image_
- Update user cover Image: POST _/api/v1/users/update-avatar-image_
- Update user details: POST _/api/v1/users/update-details_
- Update user password: POST _/api/v1/users/update-password_
- Include the token in the Authorization header for protected routes.

## Contact

Author: Anil Kumar
Website: https://singhak.in/

#### This project inpired from this youtube channel https://www.youtube.com/@chaiaurcode
