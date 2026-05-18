import mongoose from "mongoose";
import dotenv from "dotenv";
import JobRequest from "../src/models/JobRequest.js";

dotenv.config();

// sample jobs data
const jobs = [
  {
    title: "Fix Kitchen Sink",
    description: "Leaking pipe under kitchen sink",
    category: "Plumbing",
    location: "Colombo",
    contactName: "John",
    contactEmail: "john@test.com",
    status: "Open",
  },
  {
    title: "Paint Living Room",
    description: "Need full wall painting",
    category: "Painting",
    location: "Kandy",
    contactName: "Sarah",
    contactEmail: "sarah@test.com",
    status: "Open",
  },
  {
    title: "Electrical Wiring Fix",
    description: "Power outage in bedroom",
    category: "Electrical",
    location: "Galle",
    contactName: "Mike",
    contactEmail: "mike@test.com",
    status: "In Progress",
  },
  {
    title: "Garden Cleaning",
    description: "Remove weeds and clean garden",
    category: "Gardening",
    location: "Negombo",
    contactName: "Anna",
    contactEmail: "anna@test.com",
    status: "Open",
  },
  {
    title: "AC Repair",
    description: "Air conditioner not cooling",
    category: "Repair",
    location: "Colombo",
    contactName: "David",
    contactEmail: "david@test.com",
    status: "Closed",
  },
];

const seedDB = async () => {
  try {
    // connect DB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    // clear old data
    await JobRequest.deleteMany();

    console.log("🧹 Old jobs cleared");

    // insert new jobs
    await JobRequest.insertMany(jobs);

    console.log("🌱 Sample jobs inserted successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding DB:", error);
    process.exit(1);
  }
};

seedDB();