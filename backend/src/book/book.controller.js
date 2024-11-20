import Book from "./book.model.js";

const postABook = async (req, res) => {
  //console.log(req.body);
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(200).send({
      message: "Book Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Creating Book",
    });
  }
};

//get all books
const getAllBooks = async (req, res) => {
  try {
    const Books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(Books); // Directly send the array
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Getting Books" });
  }
};

//get single book
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({
        message: "Book Not Found",
      });
    }
    res.status(200).send({
      message: "Book Fetched Successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Getting Book",
    });
  }
};
//Update a book
const updateABook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).send({
        message: "Book Not Found",
      });
    }
    res.status(200).send({
      message: "Book Updated Successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Updating Book",
    });
  }
};
//delete a book
const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send({
        message: "Book Not Found",
      });
    }
    res.status(200).send({
      message: "Book Deleted Successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Deleting Book",
    });
  }
};

//Search books
const getBooksBySearch = async (req, res) => {
  try {
      const searchQuery = req.query.title?.trim(); // Use 'title' as query parameter
      if (!searchQuery) {
          return res.status(400).json({ message: "Search query cannot be empty" });
      }

      // Search for books using text search or regex
      const books = await Book.find({
          title: { $regex: searchQuery, $options: 'i' },
      });

      // Return books or an empty array with a message
      if (books.length === 0) {
          return res.status(200).json({ message: "No books found", books: [] });
      }

      res.status(200).json(books);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
  }
};


export { postABook, getAllBooks, getSingleBook, updateABook, deleteABook,getBooksBySearch };
