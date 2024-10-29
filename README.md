# Car API

A RESTful API for managing car listings in an automobile marketplace. Sellers can add listings with details and images, while buyers can search, filter, and view detailed information about available cars.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Add a New Car Listing](#add-a-new-car-listing)
  - [Search and Filter Cars](#search-and-filter-cars)
  - [Car Detail View](#car-detail-view)
- [Contributing](#contributing)
- [Unit Tests](#Unit tests)
- [Deployment](#deployment)
- [License](#license)

## Features

- **Add Car Listings**: Create new car listings with details and images.
- **Search and Filter**: Retrieve a list of cars based on filter criteria such as make, model, year, price, and mileage.
- **Get A Single Car Detail By It Id**: Get a single car detail using the Id.
- **Image Uploads**: Upload images associated with car listings.

## Technologies

This project is built using the following technologies:

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for Node.js.
- **Swagger**: Documentation tool for RESTful APIs.
- **MongoDB**: Database for storing car listing information.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Multer**: Middleware for handling file uploads.
- **Jest**: Unit testing framework.

## Installation

Follow the steps below to set up the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (>= 14.x)
- [MongoDB](https://www.mongodb.com/) (or use a cloud provider like MongoDB Atlas)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/BISHOPDAN/automobile-marketplace-api.git
   cd automobile-marketplace-api


2.  **Install Dependencies**

   ```bash
   npm install


3.  **.env**

   ```bash
   PORT=4000
   DB_URI=your_mongodb_uri


4.  **Run the Application**

   ```bash
   npm start

4.  **Swagger Url link**

   ```bash
   https://automobile-marketplace-api-1.onrender.com/api-docs