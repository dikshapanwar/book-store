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
const getBooksBySearch = (req, res) => {
  const { title } = req.query;

  Book.find({ title: { $regex: title, $options: 'i' } })
    .then(books => res.json(books))
    .catch(error => res.status(500).json({ message: error.message }));
};



export { postABook, getAllBooks, getSingleBook, updateABook, deleteABook,getBooksBySearch };
