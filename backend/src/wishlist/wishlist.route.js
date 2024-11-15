import { Router } from 'express';
import { findById } from '../models/user';  
import Wishlist from '../wishlist/wishlist.model'; // Mongoose model for the Wishlist
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
    const existingItem = await Wishlist.findOne({ user_id, product_id });
    if (existingItem) {
      return res.status(400).send('Product already in the wishlist');
    }

    // Add product to the wishlist
    const newItem = new Wishlist({
      user_id,
      product_id,
      added_at: new Date(),
    });

    // Save the new wishlist item to the database
    await newItem.save();
    res.status(201).send('Product added to wishlist');
  } catch (err) {
    console.error(err); // For better debugging
    res.status(500).send('Server error');
  }
});

export default router;
