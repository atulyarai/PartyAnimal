# Party Animal

A full-stack web application for discovering, creating, and reviewing local events and parties. Users can browse events without an account, but must register to create events or leave reviews.

## Features

- **User Authentication**: Register, login, logout
- **Event Management**: Create, edit, delete events with images
- **Review System**: Leave and manage reviews for events
- **Image Upload**: Cloudinary integration
- **Responsive Design**: Mobile-friendly Bootstrap interface
- **Security**: CSRF protection, input sanitization, secure sessions

## Tech Stack

**Frontend:** HTML5, CSS3, Bootstrap 5, EJS, JavaScript  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** Passport.js, Express Session, Connect-Mongo  
**Security:** Helmet, Express Mongo Sanitize  
**File Storage:** Multer, Cloudinary  
**Deployment:** Render, MongoDB Atlas

## Quick Start

1. Clone the repository
2. Copy `env.template` to `.env` and fill in your values
3. Run `npm install`
4. Run `npm start`
5. Access at `http://localhost:3000`

## Environment Variables

```
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/party-animal
SECRET=your-super-secret-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
NODE_ENV=production
CLIENT_URL=https://your-app.onrender.com
```

## Deployment (Render)

1. Set environment variables in Render dashboard
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Ensure MongoDB Atlas allows connections from Render IPs

## Project Structure

```
PartyAnimal/
├── app.js                 # Main application
├── models/               # MongoDB models
├── routes/               # Express routes
├── controllers/          # Route handlers
├── views/                # EJS templates
├── public/               # Static files
├── middleware.js         # Custom middleware
└── seeds/                # Database seeding
```

## Screenshots

> HomePage
> ![image](https://github.com/user-attachments/assets/ee03df3c-4af4-4bae-a7b5-ae84a111ac8f)

> All Events
> ![image](https://github.com/user-attachments/assets/5eddcc75-f9bf-431e-b2e3-1938ac7bc03c)

> Single Event ShowPage
> ![image](https://github.com/user-attachments/assets/1e9d7030-58bd-4524-9c5b-a348f702316c)

> Login & Register page
> ![image](https://github.com/user-attachments/assets/2f8e6baa-eac0-4d9e-a0c7-f469329a1ae2)


## License

ISC License
