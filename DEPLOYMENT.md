# Deployment Guide for Party Animal

## 🚀 Render Deployment

### Prerequisites

1. **MongoDB Atlas Cluster**

   - Create a free cluster on MongoDB Atlas
   - Set up a database user with read/write permissions
   - Configure Network Access to allow connections from anywhere (0.0.0.0/0)
   - Get your connection string

2. **Cloudinary Account**
   - Sign up for a free Cloudinary account
   - Get your cloud name, API key, and API secret

### Environment Variables

Set these environment variables in your Render service:

```
NODE_ENV=production
CLIENT_URL=https://your-app-name.onrender.com
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/party-animal?retryWrites=true&w=majority
SECRET=your-super-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_KEY=your-cloudinary-api-key
CLOUDINARY_SECRET=your-cloudinary-api-secret
```

### Build Configuration

- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Key Fixes Applied

1. **MongoDB Connection Options**

   - Removed deprecated `useNewUrlParser` and `useUnifiedTopology`
   - Replaced `sslValidate` with `tlsAllowInvalidCertificates`
   - Added proper SSL configuration for production

2. **Connect-Mongo Compatibility**

   - Updated to v5.1.0 for better Node.js v22 compatibility
   - Fixed import syntax: `require("connect-mongo")(session)`
   - Updated store creation to use `new MongoStore()`

3. **Dependency Updates**
   - All dependencies updated to latest compatible versions
   - Removed package-lock.json to force fresh dependency resolution

### Troubleshooting

If you encounter issues:

1. **MongoDB Connection Errors**

   - Verify your connection string format
   - Check that your MongoDB Atlas cluster allows connections from Render
   - Ensure your database user has the correct permissions

2. **SSL/TLS Issues**

   - The app now uses `tlsAllowInvalidCertificates` for production
   - SSL is automatically enabled in production mode

3. **Session Store Errors**
   - Connect-mongo v5.1.0 is now properly configured
   - Session storage should work correctly with MongoDB Atlas

### Local Development

1. Copy `env.template` to `.env`
2. Fill in your local development values
3. Run `npm install` to install dependencies
4. Start with `npm start`

### Production Checklist

- [ ] All environment variables set in Render
- [ ] MongoDB Atlas cluster configured and accessible
- [ ] Cloudinary account set up
- [ ] NODE_ENV=production set
- [ ] CLIENT_URL matches your Render domain
- [ ] Database seeded (if needed)

Your application should now deploy successfully on Render! 🎉
