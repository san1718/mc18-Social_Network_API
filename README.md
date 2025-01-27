# NoSQL: Social Network API

## Table of Contents
* [Overview](#overview)
* [Features](#features)
* [Installation / Usage](#installation--usage)
* [Summary](#summary)
* [Links](#links)
* [Screenshots](#screenshots)

## Overview
As a social media startup, the user wants an API for their social network that uses a NoSQL database so that the website can handle large amounts of unstructured data.
Given a social network API, the user is connected to MongoDB database with Mongoose models synced.

## Features
* Sync to database
* Data displayed
* Create, Update, Delete users in database
* Test API POST and DELETE routes

## Installation / Usage
1. Clone repository:
    * git clone git@github.com:san1718/mc18-Social_Network_API.git
2. Install Dependencies:
    * npm install
3. Configure Environment Variables:
    Create .env file in the root directory and add the MongoDB URI:
    * MONGO_URI=mongodb://127.0.0.1:27017/socialNetworkDB
4. (Optional) Add Seeds to the Database:
    * node seed.js
5. Start Server:
    * npm start

## Testing
Use one of the following to test the API endpoints: 
* Insomnia
* Postman

## Route Examples
User Routes
* GET /api/users
* POST /api/users
* Get /api/users/:id
* PUT /api/users/:id

Thought Routes
* GET api/thoughts
* POST /api/thoughts
* GET /api/thoughts/:id
* PUT /api/thoughts/:id
* DEL /api/thoughts/:id

Friend and Reaction Routes
* POST /api/thoughts/:thoughtId/reactions
* DEL /api/thoughts/:thoughtId/reactions/:reactionId
* POST /api/users/:userId/friends/:friendId
* DEL /api/users/:userId/friends/:friendId

## Technologies Used
* Node.js
* Express.js
* MongoDB
* Mongoose
* dontenv
* Insomnia

## Summary 
The Social Media API will help the users create a solution for a powerful and flexible backend.
This will help the user build a scalable NoSQL database structure.

## Links
[Home](https://github.com/san1718/mc18-Social_Network_API)
<br />
[Demo]()

## Screenshots
<img width="1000" alt="Routes" src="https://github.com/san1718/mc18-Social_Network_API/blob/main/images/Routes.png">
<img width="1000" alt="RouteF" src="https://github.com/san1718/mc18-Social_Network_API/blob/main/images/RouteF.png">
<img width="1000" alt="Demo" src="">
<img width="1000" alt="" src="">

## Credits
Starter code from module mini project
