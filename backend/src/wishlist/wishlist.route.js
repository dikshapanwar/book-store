import { Router } from "express";
import Wishlist from "../wishlist/wishlist.model.js"; // Mongoose model for the Wishlist
import User from "../users/user.model.js";

const router = Router();
router.post("/add-wishlist", async (req, res) => {
  const { user_id, product_id } = req.body;
  try {

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const existingItem = await Wishlist.findOne({ user_id, product_id });
    if (existingItem) {
      return res.status(400).send("Product already in the wishlist");
    }

    // Add product to the wishlist
    const newItem = new Wishlist({
      user_id,
      product_id,
      added_at: new Date(),
    });

    // Save the new wishlist item to the database
    await newItem.save();
    res.status(201).send("Product added to wishlist");
  } catch (err) {
    console.error(err); // For better debugging
    res.status(500).send("Server error");
  }
});

export default router;
