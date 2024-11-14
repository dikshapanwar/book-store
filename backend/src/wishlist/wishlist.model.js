import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productIds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
      ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
{
    timestamps: true,
}
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;