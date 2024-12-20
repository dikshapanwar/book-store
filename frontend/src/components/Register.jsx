import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import getBaseUrl from '../utils/baseUrl';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [message, setMessage] = useState('');
  const { registerUser, loading, error } = useAuth();  // Get register function from context
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // REGISTER A USER
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await registerUser(data.username, data.email, data.password);  // Using registerUser from context
      if (!error) {
        setMessage('User Registered Successfully');
        alert('User Registered Successfully');
        navigate('/login');
      } else {
        setMessage(error);  // Display error if occurs
      }
    } catch (error) {
      setMessage('Error: Unable to register user');
      console.error(error);
    }
  };

 

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center mt-10">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>

        {/* Attach handleSubmit to the form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              UserName
            </label>
            <input
              {...register('username', { required: true })}
              type="text"
              id="username"
              placeholder="User Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.username && <p className="text-red-500 text-xs">Username is required</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register('password', { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.password && <p className="text-red-500 text-xs">Password is required</p>}
          </div>

          {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="align-baseline font-medium mt-4 text-sm">
          Have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>

       
        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Register;
