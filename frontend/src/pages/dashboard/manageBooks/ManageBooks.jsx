import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/books/bookApi';

const ManageBooks = () => {
    const navigate = useNavigate();
    const { data: books, refetch, isLoading, isError } = useFetchAllBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    // Handle deleting a book
    const handleDeleteBook = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this book?");
            if (!confirmDelete) return;

            // Wait for delete mutation to finish before refetching
            await deleteBook(id).unwrap();
            alert('Book deleted successfully!');
            await refetch();
        } catch (error) {
            console.error('Failed to delete book:', error?.message);
            alert('Failed to delete book. Please try again.');
        }
    };

    // Handle navigating to Edit Book page
    const handleEditClick = (id) => {
        navigate(`/dashboard/edit-book/${id}`);
    };

    // Handle loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (isError || !books) return <div>Failed to load books.</div>;

    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left">#</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Book Title</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Category</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Price</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.length > 0 ? (
                                    books.map((book, index) => (
                                        <tr key={book._id}>
                                            <th className="px-6 py-4 text-xs text-left">{index + 1}</th>
                                            <td className="px-6 py-4 text-xs">{book.title}</td>
                                            <td className="px-6 py-4 text-xs">{book.category}</td>
                                            <td className="px-6 py-4 text-xs">${book.newPrice}</td>
                                            <td className="px-6 py-4 text-xs space-x-4">
                                                <button
                                                    onClick={() => handleEditClick(book._id)}
                                                    className="text-indigo-600 hover:text-indigo-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBook(book._id)}
                                                    className="bg-red-500 text-white py-1 px-4 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">No books found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageBooks;
