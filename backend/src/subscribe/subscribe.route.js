import Router from "express";
import Newsletter from "./subscribe.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

// Initialize the transporter with environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Ensure you're using environment variables
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});



router.post("/add", async (req, res) => {
  const { email } = req.body;
  console.debug("Received subscription request for email:", email);

  if (!email) {
    console.warn("Email is missing in the request body");
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Save subscriber to the database
    const subscriber = new Newsletter({ email });
    await subscriber.save();
    console.debug("Subscriber saved successfully:", subscriber);

    // Send notification email to the admin
    console.debug("Sending email to admin...");
    await transporter.sendMail({
      from: '"Newsletter" <newsletter@example.com>',
      to: "admin@example.com",
      subject: "New Newsletter Subscription",
      text: `A new user has subscribed to the newsletter with the email: ${email}`,
    });
    console.info("Notification email sent to admin successfully.");

    res.status(200).json({ message: "Subscription successful!" });
  } catch (err) {
    if (err.code === 11000) {
      console.warn("Duplicate email subscription attempt:", email);
      res.status(400).json({ message: "Email is already subscribed" });
    } else {
      console.error("Unexpected error during subscription:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.get("/all", async (req, res) => {
  try {
    const subscribers = await Newsletter.find(); // Retrieve all subscriptions
    res.status(200).json(subscribers); // Send JSON response
  } catch (err) {
    console.error("Error fetching subscribers:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
