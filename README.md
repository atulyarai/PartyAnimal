# PartyAnimal

PartyAnimal is a full-stack website project where users can create and review campgrounds.
In order to review or create a campground, you must have an account. This project is a part of Colt Steele's web dev bootcamp course on udemy.

This project is being created created using Node.js, Express, MongoDB, and Bootstrap. Passport.js is used to handle authentication.

## Functionalities

> Everyone can view the camps and reviews without signing up or logging in.

> The user will have to login to edit the campground details or any comments.

> The user can only edit/delete the campgrounds and comments that they have added.

> All the data will pe persistent and is stored in the awazon cloud.

## Technologies Used:

> HTML5 - markup language for creating web pages and web applications

> CSS3 - used for describing the presentation of a document written in a markup language

> Bootstrap - free and open-source front-end web framework for designing websites and web applications quickly

> jQuery - cross-platform JavaScript library designed to simplify the client-side scripting of HTML

> DOM Manipulation - is a platform and language-neutral interface that allows programs and scripts to dynamically access and update the content, structure, and style of a document

> Node.js - pen-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side

> Express.js - for building web applications and APIs and connecting middleware

> REST - REST (REpresentational State Transfer) is an architectural style for developing web services

> MongoDB - open-source cross-platform document-oriented NoSQL database program to store details like users info, campgrounds info and comments

> PassportJS - authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application

> Data Associations - associating user data with the respective campgrounds and comments using reference method

> Heroku - cloud platform as a service used as a web application deployment model

> AWS - mongodb is hosted on amazon ec2 instance

## Deployment

### Environment Variables

For production deployment, you need to set the following environment variables:

- `DB_URL`: Your MongoDB connection string
- `SECRET`: A secure random string for session encryption
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_KEY`: Your Cloudinary API key
- `CLOUDINARY_SECRET`: Your Cloudinary API secret
- `NODE_ENV`: Set to "production" for production deployment
- `CLIENT_URL`: Your production domain URL (e.g., "https://your-app.herokuapp.com")

### Render Deployment

For deploying on Render:

1. **Environment Variables**: Set all the above environment variables in your Render service settings
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **MongoDB Atlas**: Make sure your MongoDB Atlas cluster allows connections from all IP addresses (0.0.0.0/0) or specifically from Render's IP ranges

### Important Notes

- The `CLIENT_URL` environment variable is required for production to ensure proper session cookie configuration and security headers
- Make sure to set `NODE_ENV=production` in your production environment
- Copy `env.template` to `.env` and fill in your actual values for local development
- For MongoDB Atlas on Render, SSL validation is disabled to handle connection issues
- The application includes automatic connection retry logic for MongoDB
- Uses `connect-mongo` v4.6.0 for session storage compatibility

## Screenshots

> HomePage
> ![home](https://user-images.githubusercontent.com/51289274/113733448-1a3ac300-9718-11eb-9fc7-defb8d2cd9c1.png)

> All Campgrounds
> ![All campgrounds](https://user-images.githubusercontent.com/51289274/113733438-173fd280-9718-11eb-8a0d-8e13f1ab3d45.png)

->Single Campground ShowPage
![showPage](https://user-images.githubusercontent.com/51289274/113733465-1e66e080-9718-11eb-9ffe-8b047640942a.png)

->Login & Register page
![login,register](https://user-images.githubusercontent.com/51289274/113734300-d8f6e300-9718-11eb-801e-5cb4698a1560.png)

.card img {
aspect-ratio: 16/9;
object-fit: cover;
width: 100%;
}
