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
    res.status(200).send({
      message: "Books Fetched Successfully",
      data: Books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Getting Books",
    });
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
    const book = await Book.findByIdAndUpdate(id, req.body);
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
const deleteABook=async(req,res)=>{
    try {
        const {id}=req.params;
        const book=await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).send({
                message:"Book Not Found"
            })
        }
        res.status(200).send({
            message:"Book Deleted Successfully",
            data:book
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Error Deleting Book"
        })
    }
}
export { postABook, getAllBooks, getSingleBook,updateABook,deleteABook };
