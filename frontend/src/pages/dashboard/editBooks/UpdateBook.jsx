import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useFetchBookByIDQuery } from '../../../redux/books/bookApi';
import getBaseUrl from '../../../utils/baseUrl';
import SelectField from '../addbooks/SelectField';
import InputField from '../addbooks/InputField';

const UpdateBook = () => {
  const { id } = useParams();

  // Fetch book data using RTK Query
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIDQuery(id);

  // Initialize react-hook-form
  const { register, handleSubmit, reset } = useForm();

  // Populate form fields when book data is fetched
  useEffect(() => {
    if (bookData?.data) {
      console.log('Fetched book data:', bookData.data); // Debugging line

      // Populate form fields with fetched data
      reset({
        title: bookData?.data?.title || '',
        description: bookData?.data?.description || '',
        category: bookData?.data?.category || '',
        trending: bookData?.data?.trending || false,
        oldPrice: bookData?.data?.oldPrice || '',
        newPrice: bookData?.data?.newPrice || '',
        coverImage: bookData?.data?.coverImage || '',
      });
    }
  }, [bookData, reset]);

  // Form submission handler
  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage,
    };

    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      Swal.fire({
        title: "Book Updated",
        text: "Your book has been updated successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay"
      });
      refetch();
    } catch (error) {
      console.error("Failed to update book:", error);
      Swal.fire({
        title: "Update Failed",
        text: "Could not update the book. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Close"
      });
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching book data</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField label="Title" name="title" placeholder="Enter book title" register={register} />
        <InputField label="Description" name="description" type="textarea" placeholder="Enter book description" register={register} />
        
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' }
          ]}
          register={register}
        />
        
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              {...register('trending')} 
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
              defaultChecked={bookData?.data?.trending} // Ensure checkbox is properly checked
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        <InputField label="Old Price" name="oldPrice" type="number" placeholder="Enter old price" register={register} />
        <InputField label="New Price" name="newPrice" type="number" placeholder="Enter new price" register={register} />
        <InputField label="Cover Image URL" name="coverImage" type="text" placeholder="Enter cover image URL" register={register} />
        
        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md mt-4">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
