import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    trending: {
      type: Boolean,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      // If you want it optional, you can omit required, or add a default value like:
      // default: 0, 
    },
    coverImage: {
      type: String,
      // If optional, no `required` needed here
    },
    // author: {
    //   type: String,
    //   required: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book; // Use export instead of module.exports for ES Modules
