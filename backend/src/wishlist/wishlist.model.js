import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to reference
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Book', // Assuming the product is also referenced by its ObjectId
    required: true,
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
