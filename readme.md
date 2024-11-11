# Todo App

This is a simple Todo application with separate frontend and backend folders. The backend is built with Express.js, MongoDB, and JWT authentication, while the frontend is configured using Vite.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)

## Features
- User authentication (sign up, login)
- CRUD operations on todo items
- RESTful API structure

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** Vite, HTML, CSS, JavaScript
- **Authentication:** JWT
- **Environment Configuration:** dotenv

## Setup Instructions

1. **Clone the Repository**
    ```bash
    git clone https://github.com/UjjwalKumarSavita/Todo_App.git
    cd Todo_App
    ```

2. **Install Dependencies**
    - **Backend**:
      ```bash
      cd backend
      npm install
      ```

    - **Frontend**:
      ```bash
      cd ../frontend
      npm install
      ```

3. **Set Up Environment Variables**
    - **Backend**: In the `backend` folder, create a `.env` file with the following variables:
        ```plaintext
        PORT=3000
        DB_URL=<Your_MongoDB_Connection_URL>
        JWT_SECRET=<Your_JWT_Secret_Key>
        ```
      - Replace `<Your_MongoDB_Connection_URL>` with your MongoDB connection string.
      - Replace `<Your_JWT_Secret_Key>` with a secure key for signing JWT tokens.

    - **Frontend**: In the `frontend` folder, create a `.env` file with the following variable:
        ```plaintext
        VITE_BASE_ADDRESS=http://localhost:3000
        ```
      - Update the `VITE_BASE_ADDRESS` if your backend is hosted at a different URL.

## Running the Project

1. **Start the Backend Server**
    - In the `backend` folder:
      ```bash
      nodemon index.js
      ```

2. **Start the Frontend**
    - In the `frontend` folder:
      ```bash
      npm run dev
      ```
    - The frontend should start on `http://localhost:5173` by default.

## API Endpoints

### Auth Routes
- **POST** `/auth/signup` - Register a new user
- **POST** `/auth/login` - Login a user

### Todo Routes
- **GET** `/todo/getalltodos` - Get all todos for the logged-in user
- **POST** `/todo/create` - Create a new todo
- **PUT** `/todo/update/:id` - Update a specific todo
- **DELETE** `/todo/delete/:id` - Delete a specific todo
- **PATCH** `/todo/:id/togglestatus` - Toggle the status of completion


---

This README structure provides clear guidance for setup and environment configuration. Let me know if any other adjustments are needed!
