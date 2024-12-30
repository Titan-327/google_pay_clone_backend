# Backend API for Payment Integration

This repository contains the backend code for handling user authentication, payment processing, and transaction management using **Express**, **MongoDB**, **JWT (JSON Web Token)**, and **MongoDB Transactions**. The backend handles payment flow with atomic transactions and ensures secure authentication using JWT.

## Features

- **JWT Authentication**: Secure user authentication using JWT tokens.
- **MongoDB Transactions**: Ensures atomic operations for payment processing, so either the payment is successfully completed, or no changes are made.
- **Express Routing**: Provides API routes for authentication and payment processing.
- **Secure Payment Handling**: Payment transactions are safely processed, and the database is rolled back in case of any failure.

## Tech Stack

- **Node.js**: JavaScript runtime environment for building the backend.
- **Express.js**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database used to store user and payment data.
- **Mongoose**: MongoDB ODM (Object Data Modeling) library for easier database interactions.
- **JWT (JSON Web Token)**: Used for securely handling user authentication.
- **MongoDB Transactions**: Used for atomic operations in payment processing.

