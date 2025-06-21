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
> ![home](https://user-images.githubusercontent.com/51289274/113733448-1a3ac300-9718-11eb-9fc7-defb8d2cd9c1.png)

> All Events
> ![All campgrounds](https://user-images.githubusercontent.com/51289274/113733438-173fd280-9718-11eb-8a0d-8e13f1ab3d45.png)

> Single Event ShowPage
> ![showPage](https://user-images.githubusercontent.com/51289274/113733465-1e66e080-9718-11eb-9ffe-8b047640942a.png)

> Login & Register page
> ![login,register](https://user-images.githubusercontent.com/51289274/113734300-d8f6e300-9718-11eb-801e-5cb4698a1560.png)

## License

ISC License
