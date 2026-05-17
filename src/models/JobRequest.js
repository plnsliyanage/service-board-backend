import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   category: String,
   location: String,
   contactName: String,
   contactEmail: {
      type: String,
      required: true
   },
   status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open"
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const JobRequest = mongoose.model("JobRequest", jobSchema);

export default JobRequest;