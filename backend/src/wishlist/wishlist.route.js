import { Router } from 'express';
import { findById } from '../models/user'; // Assuming User model includes wishlist
import Wishlist, { findOne } from '../models/wishlist'; // Separate Wishlist model for MongoDB
const router = Router();

router.post('/wishlist', async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    // Check if the user exists
    const user = await findById(user_id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the product is already in the wishlist
    const existingItem = await findOne({ user_id, product_id });
    if (existingItem) {
      return res.status(400).send('Product already in the wishlist');
    }

    // Add product to the wishlist
    const newItem = new Wishlist({
      user_id,
      product_id,
      added_at: new Date(),
    });

    await newItem.save();
    res.status(201).send('Product added to wishlist');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;
