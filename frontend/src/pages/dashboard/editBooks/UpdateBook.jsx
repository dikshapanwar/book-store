import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import { useFetchBookByIDQuery } from "../../../redux/books/bookApi";
import getBaseUrl from "../../../utils/baseUrl";
import SelectField from "../addbooks/SelectField";
import InputField from "../addbooks/InputField";

const UpdateBook = () => {
  const { id } = useParams();
  const [imageFileName, setImageFileName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIDQuery(id);

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      trending: false,
      oldPrice: "",
      newPrice: "",
    },
  });

  // Populate form fields when book data is fetched
  useEffect(() => {
    if (bookData?.data) {
      reset({
        title: bookData.data.title,
        description: bookData.data.description,
        category: bookData.data.category,
        trending: bookData.data.trending,
        oldPrice: bookData.data.oldPrice,
        newPrice: bookData.data.newPrice,
      });
      setSelectedImageUrl(bookData.data.coverImage);
    }
  }, [bookData, reset]);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImageUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Form submission handler
  const onSubmit = async (bookData) => {
    const updateBookData = new FormData();
    updateBookData.append("title", bookData.title);
    updateBookData.append("description", bookData.description);
    updateBookData.append("category", bookData.category);
    updateBookData.append("trending", bookData.trending);
    updateBookData.append("oldPrice", Number(bookData.oldPrice));
    updateBookData.append("newPrice", Number(bookData.newPrice));

    if (imageFile) {
      updateBookData.append("coverImage", imageFile);
    }

    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire("Book Updated", "Your book has been updated successfully!", "success");
      refetch();
    } catch (error) {
      console.error("Failed to update book:", error);
      Swal.fire("Update Failed", "Could not update the book. Please try again.", "error");
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching book data</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />
        <InputField
          label="Description"
          name="description"
          type="textarea"
          placeholder="Enter book description"
          register={register}
        />
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
          ]}
          register={register}
        />

        {/* Checkbox for Trending */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Enter old price"
          register={register}
        />
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="Enter new price"
          register={register}
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {selectedImageUrl && (
            <img src={selectedImageUrl} alt="Cover Preview" className="w-32 h-32 object-cover mt-2" />
          )}
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md mt-4">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
