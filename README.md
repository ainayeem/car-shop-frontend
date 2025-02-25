# CarShop E-Commerce Platform

## Overview

This is a Car E-Commerce Platform, a web application designed to facilitate the purchase and management of cars. The platform includes user registration, authentication, role-based access control and a variety of features tailored to both users and administrators.

## Live Site Frontend : https://the-car-shop.vercel.app

## Live Site Backend : https://car-shop-backend.vercel.app

Admin Credientials:
email: admin@car-shop.com
password: 1234


## Features

### User Registration & Authentication

- **User Registration**: New users can create an account by providing necessary details.
- **Login Functionality**: Registered users can log in to access personalized features.
- **Role-Based Authentication**:
  - **User Role**: Standard access to view cars, place orders.
  - **Admin Role**: Enhanced access to manage cars, view all orders and oversee platform activities.

### Routing

- **Public Routes**:
  - **Home Page**: Displays an overview of the platform.
  - **All Cars Page**: Lists all available cars with options to filter and sort.
  - **Car Details Page**: Shows detailed information about a specific car.
  - **About Us Page**: Provides information about the platform.
- **Private Routes**:
  - **Checkout Page**: Accessible only to authenticated users for placing orders.
  - **Dashboard**:
    - **User Dashboard**: Users can view their order history.
    - **Admin Dashboard**: Admins can manage cars and view all orders.

## Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Payment Gateway:** SurjoPay
- **State Management:** Redux Toolkit
- **Deployment:** Vercel

## Installation & Setup

### Frontend Setup

```sh
# Install dependencies
npm install

# Start the server
npm run dev
```


