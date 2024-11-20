import Router from "express";
import Newsletter from "./subscribe.model.js";
const router = Router();
// Newsletter subscription endpoint
router.post("/add", async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    try {
      // Save the email to the database
      const subscriber = new Newsletter({ email });
      await subscriber.save();
  
      res.status(200).json({ message: "Subscription successful!" });
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate email error
        res.status(400).json({ message: "Email is already subscribed" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  export default router;