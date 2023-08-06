# Cheese, the page

A simple page for cheese enthusiasts to share their favorite cheeses, participate in discussions, and express their sympathies through likes.

# Getting started

## Technologies

### Backend:

- [Node.js](https://nodejs.org/en/download) (at least v18.16.0)
- [MongoDB](https://account.mongodb.com/account/login?_ga=2.232153309.370845564.1691079535-1497946635.1684251336) account

## Installation

Create a folder where you would like to store this app:

    cd C:\AppDirectory
    git clone https://github.com/qerthopoly/cheese.git
    cd cheese

Then create .env file in .\cheese\backend folder and add a secret JWT key of your choice:

    JWT_SECRET=jwtSecretKeyOfYourChoice

You can open two new git bash terminals and dedicate one for frontend, one for backend.

### Back End

In backend terminal, start by going to backend folder, install all required elements and start a server:

    cd backend
    npm install
    npm start

You should see this message:

    It lives on http://localhost:9998/cheese

Keep in mind that it runs on 9998 port. You can change it in .\cheese\backend\server.js file ant the begining (and other frontend files which are located in .\cheese\frontend\src\routes):

    const PORT = 9998;

### Front End

In frontend terminal, start by going to frontend folder, install all required elements and start a server:

    cd frontend
    npm install
    npm start

The app should open in a new browser window or tab on a http://localhost:9999

You can set new port address in .\cheese\frontend\package.json file:

    "scripts": {
    	"start": "set PORT=9999 && react-scripts start"
    },

## Depencencies:

#### Backend:

    bcrypt: ^5.1.0,
    cors: ^2.8.5,
    dotenv: ^16.3.1,
    express: ^4.18.2,
    joi: ^17.9.2,
    jsonwebtoken: ^9.0.1,
    mongodb: ^5.7.0,
    nodemon: ^3.0.1

#### Frontend:

    @testing-library/jest-dom: ^5.17.0,
    @testing-library/react: ^13.4.0,
    @testing-library/user-event: ^13.5.0,
    react: ^18.2.0,
    react-dom: ^18.2.0,
    react-icons: ^4.10.1,
    react-router-dom: ^6.14.2,
    react-scripts: ^5.0.1,
    web-vitals: ^2.1.4

# API Endpoints

## GET /cheese

### Retrieve a list of all cheeses.

### Response

- Status: 200 OK
- Body:

| Parameter   | Description          |
| ----------- | -------------------- |
| name        | Cheese name          |
| description | Cheese decription    |
| picture     | Cheese picture's URL |

## POST /cheese

### Add new cheese.

### Headers

- `Authorization`: Bearer token (JWT) for authentication.

### Request

- Body:

| Parameter   | Description          |
| ----------- | -------------------- |
| name        | Cheese name          |
| description | Cheese decription    |
| picture     | Cheese picture's URL |

### Response

- Status: 200 OK

## PUT /cheese/:id

### Update a cheese.

### Parameters:

- `id` (string): The ID of the cheese to update.

### Headers

- `Authorization`: Bearer token (JWT) for authentication.

### Request

| Parameter   | Description          |
| ----------- | -------------------- |
| name        | Cheese name          |
| description | Cheese decription    |
| picture     | Cheese picture's URL |

### Response

- Status: 200 OK

## GET /cheese/:id

### Retrieve details of a specific cheese.

### Parameters:

- `id` (string): The ID of the cheese to update.

### Response

- Status: 200 OK
- Body:

| Parameter   | Description          |
| ----------- | -------------------- |
| name        | Cheese name          |
| description | Cheese decription    |
| picture     | Cheese picture's URL |

## GET /comments/:cheese_id

### Retrieve comments for a specific cheese.

### Parameters:

- `cheese_id` (string): The ID of the cheese to retrieve comments for.

Response

- Status: 200 OK
- Body:

| Parameter | Description          |
| --------- | -------------------- |
| user_id   | Users ID             |
| comment   | Comment about cheese |
| date      | Date of the comment  |
| cheese_id | Cheese ID            |
| nickname  | User's nickname      |

## POST /comments

### Add a new comment.

### Headers

- `Authorization`: Bearer token (JWT) for authentication.

### Request

| Parameter | Description          |
| --------- | -------------------- |
| cheese_id | Cheese ID            |
| comment   | Comment about cheese |

### Response

- Status: 200 OK

## DELETE /comments/:comment_id

### Delete a comment.

### Parameters:

- `comment_id` (string): The ID of the comment to delete.

### Headers

- `Authorization`: Bearer token (JWT) for authentication.

### Response

- Status: 200 OK
- Body:

| Parameter  | Description |
| ---------- | ----------- |
| comment_id | Comment ID  |

## GET /likes/:cheese_id

### Retrieve the number of likes for a specific cheese.

### Parameters:

- `cheese_id` (string): The ID of the cheese to retrieve likes for.

### Response

- Status: 200 OK
- Body:

| Parameter     | Description                                     |
| ------------- | ----------------------------------------------- |
| numberOfLikes | Total amount of likes                           |
| likedByUser   | Default value "false", if user is not logged in |

## GET /likes_user/:cheese_id

### Check if the authenticated user has liked a specific cheese.

### Parameters:

- `cheese_id` (string): The ID of the cheese to check likes for.

### Headers

- `Authorization`: Bearer token (JWT) for authentication.

### Response

- Status: 200 OK
- Body:

| Parameter     | Description                                   |
| ------------- | --------------------------------------------- |
| numberOfLikes | Total amount of likes                         |
| likedByUser   | Boolean, shows if auth. user liked the cheese |

## POST /likes/:cheese_id

### Like or unlike a specific cheese.

### Parameters:

- `cheese_id` (string): The ID of the cheese to like/unlike.

### Headers

- `Authorization`: Bearer token (JWT) for authentication.

### Response

- Status: 200 OK
- Body (when liking a cheese):

| Parameter | Description                               |
| --------- | ----------------------------------------- |
| liked     | Boolean (true if liked, false if unliked) |


## POST /register

### Register a new user.

### Request body:

| Parameter | Description               |
| --------- | ------------------------- |
| nickname  | (required) Users nickname |
| password  | (required) Users password |
| email     | Users email               |

### Response

- Status: 200 OK

## POST /login

### Authenticate a user and generate a JWT token.

### Request

- Body:

| Parameter | Description               |
| --------- | ------------------------- |
| nickname  | (required) Users nickname |
| password  | (required) Users password |

### Response

- Status: 200 OK
- Body:

| Parameter | Description         |
| --------- | ------------------- |
| token     | Generated JWT Token |
| users_id  | Users ID            |
| nickname  | Users nickname      |

## GET /posts

### Retrieve user's information after successful authentication.

### Headers

- `Authorization`: Bearer token (JWT) for authentication.

### Response

- Status: 200 OK
- Body:

| Parameter | Description    |
| --------- | -------------- |
| users_id  | Users ID       |
| nickname  | Users nickname |
