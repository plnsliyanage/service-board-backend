import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["HOMEOWNER", "TRADESPERSON"],
    default: "HOMEOWNER",
  },
});

export default mongoose.model("User", userSchema);