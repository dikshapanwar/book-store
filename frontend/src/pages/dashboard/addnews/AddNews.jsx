import React, { useState, useRef } from "react";
import InputField from "../addbooks/InputField";
import { useForm } from "react-hook-form";
import { useAddNewsMutation } from "../../../redux/news/newsApi";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";
import RTE from "./eDITOR.JSX";

function AddNews() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control, // Include control
  } = useForm();

  const [imageFile, setImageFile] = useState(null);
  const [AddNews, { isLoading }] = useAddNewsMutation();
  const [imageFileName, setImageFileName] = useState("");
  const [tags, setTags] = useState("");

  const onSubmit = async (data) => {
    const newNewsData = {
      ...data,
      image: imageFileName,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await AddNews(newNewsData).unwrap();
      Swal.fire({
        title: "News added",
        text: "Your news article is uploaded successfully!",
        icon: "success",
      });
      reset();
      setImageFileName("");
      setImageFile(null);
      setTags("");
    } catch (error) {
      console.error(error);
      alert("Failed to add news. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImageFileName(file.name);
    } else {
      alert("Please select a valid image file.");
    }
  };

  return (
    <div>
      <div className="w-full mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add NEWS</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Title"
            name="title"
            placeholder="Enter News title"
            register={register}
          />

          {/* Pass control to RTE */}
          <RTE
            label="Content:"
            name="description"
            control={control}
            defaultValue=""
            errors={errors}
          />

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mb-2 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-2 w-full"
            />
            {imageFileName && (
              <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-70 py-4 px-4 bg-green-500 text-white font-bold rounded-md"
          >
            {isLoading ? <span>Adding...</span> : <span>Add News</span>}
          </button>
        </form>
      </div>
    </div>
  );
}


export default AddNews;
