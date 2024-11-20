import mongoose from "mongoose";
const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate emails
    // lowercase: true, // Convert email to lowercase
    // trim: true, // Remove extra spaces
    // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email format validation
  },
  subscribedAt: {
    type: Date,
    default: Date.now, // Automatically store subscription date
  },
});

// Create the model
const Newsletter = mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
