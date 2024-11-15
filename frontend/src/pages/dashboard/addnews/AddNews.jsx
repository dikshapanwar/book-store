import React, { useState } from 'react'
import InputField from '../addbooks/InputField'
import SelectField from '../addbooks/SelectField'
import { useForm } from 'react-hook-form';
import { useAddNewsMutation } from '../../../redux/news/newsApi';
import Swal from 'sweetalert2';

function AddNews() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [AddNews, {isLoading, isError}] = useAddNewsMutation()
    const [imageFileName, setimageFileName] = useState('')

    const onSubmit = async(data) => {
        console.log(data)
        const newNewsData = {
            ...data,
            image: imageFileName
        }
        try {
            await AddNews(newNewsData).unwrap();
            Swal.fire({
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
              });
              reset();
              setimageFileName('')
              setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to add book. Please try again.")   
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }
  return (
    <div>
           <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add NEWS</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}

        />



        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Adding.. </span> : <span>Add News</span>
          }
        </button>
      </form>
    </div>
    </div>
  )
}

export default AddNews