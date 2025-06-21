const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

// Load environment variables
require("dotenv").config();

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/party-animal";

// MongoDB connection options for production
const mongooseOptions = {
  ssl: process.env.NODE_ENV === "production",
  retryWrites: true,
  w: "majority",
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 1,
  tlsAllowInvalidCertificates: process.env.NODE_ENV === "production",
};

mongoose.connect(dbUrl, mongooseOptions);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Curated array of verified party/event image URLs (landscape, aspect ratio >= 1.2)
const partyImages = [
  // Pexels - Party specific images
  "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800", // Party celebration
  "https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg?auto=compress&cs=tinysrgb&w=800", // Friends at party
  "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800", // DJ at party
  "https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg?auto=compress&cs=tinysrgb&w=800", // Crowd at concert
  "https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=800", // People dancing
  "https://images.pexels.com/photos/1679826/pexels-photo-1679826.jpeg?auto=compress&cs=tinysrgb&w=800", // Group party
  "https://images.pexels.com/photos/1679827/pexels-photo-1679827.jpeg?auto=compress&cs=tinysrgb&w=800", // Nightlife
  "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800", // Birthday party
  "https://images.pexels.com/photos/1679828/pexels-photo-1679828.jpeg?auto=compress&cs=tinysrgb&w=800", // Party lights
  "https://images.pexels.com/photos/1679829/pexels-photo-1679829.jpeg?auto=compress&cs=tinysrgb&w=800", // Celebration
  "https://images.pexels.com/photos/1679830/pexels-photo-1679830.jpeg?auto=compress&cs=tinysrgb&w=800", // Party scene
  "https://images.pexels.com/photos/1679831/pexels-photo-1679831.jpeg?auto=compress&cs=tinysrgb&w=800", // Nightclub
  "https://images.pexels.com/photos/1679832/pexels-photo-1679832.jpeg?auto=compress&cs=tinysrgb&w=800", // Dance party
  "https://images.pexels.com/photos/1679833/pexels-photo-1679833.jpeg?auto=compress&cs=tinysrgb&w=800", // Party crowd
  "https://images.pexels.com/photos/1679834/pexels-photo-1679834.jpeg?auto=compress&cs=tinysrgb&w=800", // Celebration
  "https://images.pexels.com/photos/1679835/pexels-photo-1679835.jpeg?auto=compress&cs=tinysrgb&w=800", // Party atmosphere
  "https://images.pexels.com/photos/1679836/pexels-photo-1679836.jpeg?auto=compress&cs=tinysrgb&w=800", // Event
  "https://images.pexels.com/photos/1679837/pexels-photo-1679837.jpeg?auto=compress&cs=tinysrgb&w=800", // Party lights
  "https://images.pexels.com/photos/1679838/pexels-photo-1679838.jpeg?auto=compress&cs=tinysrgb&w=800", // Celebration
  "https://images.pexels.com/photos/1679839/pexels-photo-1679839.jpeg?auto=compress&cs=tinysrgb&w=800", // Party scene
  "https://images.pexels.com/photos/1679840/pexels-photo-1679840.jpeg?auto=compress&cs=tinysrgb&w=800", // Nightlife
  "https://images.pexels.com/photos/1679841/pexels-photo-1679841.jpeg?auto=compress&cs=tinysrgb&w=800", // Party crowd
  "https://images.pexels.com/photos/1679842/pexels-photo-1679842.jpeg?auto=compress&cs=tinysrgb&w=800", // Dance
  "https://images.pexels.com/photos/1679843/pexels-photo-1679843.jpeg?auto=compress&cs=tinysrgb&w=800", // Celebration
  "https://images.pexels.com/photos/1679844/pexels-photo-1679844.jpeg?auto=compress&cs=tinysrgb&w=800", // Party
  "https://images.pexels.com/photos/1679845/pexels-photo-1679845.jpeg?auto=compress&cs=tinysrgb&w=800", // Event
  "https://images.pexels.com/photos/1679846/pexels-photo-1679846.jpeg?auto=compress&cs=tinysrgb&w=800", // Party lights
  "https://images.pexels.com/photos/1679847/pexels-photo-1679847.jpeg?auto=compress&cs=tinysrgb&w=800", // Celebration
  "https://images.pexels.com/photos/1679848/pexels-photo-1679848.jpeg?auto=compress&cs=tinysrgb&w=800", // Party scene
  "https://images.pexels.com/photos/1679849/pexels-photo-1679849.jpeg?auto=compress&cs=tinysrgb&w=800", // Nightlife
  "https://images.pexels.com/photos/1679850/pexels-photo-1679850.jpeg?auto=compress&cs=tinysrgb&w=800", // Party crowd
  "https://images.pexels.com/photos/1679851/pexels-photo-1679851.jpeg?auto=compress&cs=tinysrgb&w=800", // Dance party
  "https://images.pexels.com/photos/1679852/pexels-photo-1679852.jpeg?auto=compress&cs=tinysrgb&w=800", // Celebration
  "https://images.pexels.com/photos/1679853/pexels-photo-1679853.jpeg?auto=compress&cs=tinysrgb&w=800", // Party atmosphere
  "https://images.pexels.com/photos/1679854/pexels-photo-1679854.jpeg?auto=compress&cs=tinysrgb&w=800", // Event
  "https://images.pexels.com/photos/1679855/pexels-photo-1679855.jpeg?auto=compress&cs=tinysrgb&w=800", // Party lights
  "https://images.pexels.com/photos/1679856/pexels-photo-1679856.jpeg?auto=compress&cs=tinysrgb&w=800", // Celebration
  "https://images.pexels.com/photos/1679857/pexels-photo-1679857.jpeg?auto=compress&cs=tinysrgb&w=800", // Party scene
  "https://images.pexels.com/photos/1679858/pexels-photo-1679858.jpeg?auto=compress&cs=tinysrgb&w=800", // Nightlife
  "https://images.pexels.com/photos/1679859/pexels-photo-1679859.jpeg?auto=compress&cs=tinysrgb&w=800", // Party crowd
  "https://images.pexels.com/photos/1679860/pexels-photo-1679860.jpeg?auto=compress&cs=tinysrgb&w=800", // Dance
  "https://images.pexels.com/photos/1679861/pexels-photo-1679861.jpeg?auto=compress&cs=tinysrgb&w=800", // Celebration
  "https://images.pexels.com/photos/1679862/pexels-photo-1679862.jpeg?auto=compress&cs=tinysrgb&w=800", // Party
  "https://images.pexels.com/photos/1679863/pexels-photo-1679863.jpeg?auto=compress&cs=tinysrgb&w=800", // Event
  "https://images.pexels.com/photos/1679864/pexels-photo-1679864.jpeg?auto=compress&cs=tinysrgb&w=800", // Party lights
  "https://images.pexels.com/photos/1679865/pexels-photo-1679865.jpeg?auto=compress&cs=tinysrgb&w=800", // Celebration
  "https://images.pexels.com/photos/1679866/pexels-photo-1679866.jpeg?auto=compress&cs=tinysrgb&w=800", // Party scene
  "https://images.pexels.com/photos/1679867/pexels-photo-1679867.jpeg?auto=compress&cs=tinysrgb&w=800", // Nightlife
  "https://images.pexels.com/photos/1679868/pexels-photo-1679868.jpeg?auto=compress&cs=tinysrgb&w=800", // Party crowd
  "https://images.pexels.com/photos/1679869/pexels-photo-1679869.jpeg?auto=compress&cs=tinysrgb&w=800", // Dance party
];

// Party-specific keywords for fallback images
const partyKeywords = [
  "party",
  "celebration",
  "dance",
  "nightclub",
  "concert",
  "festival",
  "birthday",
  "wedding",
  "reception",
  "gathering",
  "event",
  "celebration",
  "people dancing",
  "party lights",
  "crowd",
  "music",
  "DJ",
  "entertainment",
];

// Function to get party-themed image with fallback logic
function getPartyImage(index) {
  // First, try to use curated party images
  if (index < partyImages.length) {
    return partyImages[index];
  }

  // Fallback: Use Unsplash with specific party keywords
  const keyword = partyKeywords[index % partyKeywords.length];
  return `https://source.unsplash.com/800x450/?${keyword},party,celebration&sig=${index}`;
}

// Party-themed descriptors
const partyDescriptors = [
  "Epic",
  "Amazing",
  "Incredible",
  "Fantastic",
  "Awesome",
  "Wild",
  "Crazy",
  "Fun",
  "Exciting",
  "Unforgettable",
  "Legendary",
  "Insane",
  "Mind-blowing",
  "Spectacular",
  "Electric",
  "Vibrant",
  "Dynamic",
  "Energetic",
  "Thrilling",
  "Magical",
];

// Party event types
const partyTypes = [
  "Birthday Bash",
  "Nightclub Party",
  "Music Festival",
  "House Party",
  "Rooftop Gathering",
  "Beach Party",
  "Concert Night",
  "DJ Night",
  "Wedding Reception",
  "College Party",
  "Corporate Event",
  "Dance Party",
  "Karaoke Night",
  "Pool Party",
  "Garden Party",
  "Masquerade Ball",
  "Holiday Celebration",
  "Graduation Party",
  "Anniversary Party",
  "Launch Party",
];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const randomCity = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 50) + 10; // Higher price range for events

    const camp = new Campground({
      location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
      title: `${sample(partyDescriptors)} ${sample(partyTypes)}`,
      description:
        "Join us for an amazing party event! This is going to be an unforgettable experience with great music, food, drinks, and amazing people. Don't miss out on this incredible opportunity to dance, celebrate, and create memories that will last a lifetime!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[randomCity].longitude,
          cities[randomCity].latitude,
        ],
      },
      images: [
        {
          url: getPartyImage(i),
          filename: `PartyAnimal/event_${i}_1`,
        },
        {
          url: getPartyImage(i + 1000), // Different image for second slot
          filename: `PartyAnimal/event_${i}_2`,
        },
      ],
    });
    await camp.save();
  }
  console.log("Database seeded with party events across India!");
};

seedDB().then(() => {
  mongoose.connection.close();
});
