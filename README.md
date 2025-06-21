# Party Animal

Party Animal is a full-stack web application where users can discover, create, and review local events and parties. Users must have an account to create events or leave reviews. This project has been enhanced from the original campground concept to focus on social events and party planning.

## Functionalities

> Everyone can view events and reviews without signing up or logging in.

> Users must login to create new events or leave reviews.

> Users can only edit/delete events and reviews that they have created.

> All data is persistent and stored in MongoDB Atlas cloud database.

> Image uploads are handled through Cloudinary cloud storage.

## Technologies Used:

> **Frontend:**

- HTML5 - markup language for creating web pages and web applications
- CSS3 - used for describing the presentation of a document written in a markup language
- Bootstrap 5 - free and open-source front-end web framework for designing websites and web applications quickly
- EJS - templating engine for server-side rendering
- JavaScript - for client-side interactivity and form validation

> **Backend:**

- Node.js - open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side
- Express.js - for building web applications and APIs and connecting middleware
- REST - REST (REpresentational State Transfer) is an architectural style for developing web services
- MongoDB - open-source cross-platform document-oriented NoSQL database program to store details like users info, events info and reviews
- Mongoose - MongoDB object modeling tool for Node.js

> **Authentication & Security:**

- PassportJS - authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application
- Express Session - session middleware for Express
- Connect-Mongo - MongoDB session store for Express
- Helmet - security middleware for Express applications
- Express Mongo Sanitize - prevents NoSQL injection attacks

> **File Upload & Storage:**

- Multer - middleware for handling multipart/form-data
- Cloudinary - cloud-based image and video management service
- Multer Storage Cloudinary - Cloudinary storage engine for Multer

> **Data Associations:**

- Associating user data with the respective events and reviews using reference method
- User authentication and authorization

> **Deployment:**

- Render - cloud platform as a service used for web application deployment
- MongoDB Atlas - cloud-hosted MongoDB database service

## Deployment

### Environment Variables

For production deployment, you need to set the following environment variables:

- `DB_URL`: Your MongoDB Atlas connection string
- `SECRET`: A secure random string for session encryption
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_KEY`: Your Cloudinary API key
- `CLOUDINARY_SECRET`: Your Cloudinary API secret
- `NODE_ENV`: Set to "production" for production deployment
- `CLIENT_URL`: Your production domain URL (e.g., "https://partyanimal.onrender.com")

### Render Deployment

For deploying on Render:

1. **Environment Variables**: Set all the above environment variables in your Render service settings
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **MongoDB Atlas**: Make sure your MongoDB Atlas cluster allows connections from all IP addresses (0.0.0.0/0) or specifically from Render's IP ranges

### Local Development

1. Clone the repository
2. Copy `env.template` to `.env` and fill in your actual values
3. Run `npm install` to install dependencies
4. Run `npm start` to start the development server
5. Access the application at `http://localhost:3000`

### Important Notes

- The `CLIENT_URL` environment variable is required for production to ensure proper session cookie configuration and security headers
- Make sure to set `NODE_ENV=production` in your production environment
- Copy `env.template` to `.env` and fill in your actual values for local development
- For MongoDB Atlas on Render, SSL validation is disabled to handle connection issues
- The application includes automatic connection retry logic for MongoDB
- Uses `connect-mongo` v5.1.0 for session storage compatibility
- All MongoDB connection options have been updated for compatibility with Node.js v22 and newer MongoDB drivers

## Project Structure

```
PartyAnimal/
├── app.js                 # Main application file
├── models/               # MongoDB models (User, Campground, Review)
├── routes/               # Express routes
├── controllers/          # Route controllers
├── views/                # EJS templates
├── public/               # Static files (CSS, JS, images)
├── middleware.js         # Custom middleware
├── utils/                # Utility functions
├── seeds/                # Database seeding scripts
└── cloudinary/           # Cloudinary configuration
```

## Features

- **User Authentication**: Register, login, logout functionality
- **Event Management**: Create, edit, delete events with images
- **Review System**: Leave and manage reviews for events
- **Image Upload**: Cloudinary integration for event images
- **Responsive Design**: Mobile-friendly Bootstrap interface
- **Security**: CSRF protection, input sanitization, secure sessions
- **Search & Filter**: Find events by location and other criteria

## Screenshots

> HomePage
> ![home](https://user-images.githubusercontent.com/51289274/113733448-1a3ac300-9718-11eb-9fc7-defb8d2cd9c1.png)

> All Events
> ![All campgrounds](https://user-images.githubusercontent.com/51289274/113733438-173fd280-9718-11eb-8a0d-8e13f1ab3d45.png)

> Single Event ShowPage
> ![showPage](https://user-images.githubusercontent.com/51289274/113733465-1e66e080-9718-11eb-9ffe-8b047640942a.png)

> Login & Register page
> ![login,register](https://user-images.githubusercontent.com/51289274/113734300-d8f6e300-9718-11eb-801e-5cb4698a1560.png)

## License

This project is licensed under the ISC License.
