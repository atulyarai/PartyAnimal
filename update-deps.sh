#!/bin/bash
# Script to update dependencies for Render deployment

echo "Updating dependencies..."
npm install

echo "Clearing npm cache..."
npm cache clean --force

echo "Installing connect-mongo v4.6.0..."
npm install connect-mongo@4.6.0

echo "Dependencies updated successfully!" 