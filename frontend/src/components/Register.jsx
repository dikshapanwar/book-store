import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import getBaseUrl from '../utils/baseUrl';

function Register() {
  const [message, setMessage] = useState('');
  const { registerUser, googleSignIn } = useAuth();
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
      // Sending the registration data to the backend
      const response = await fetch(`${getBaseUrl()}/api/user/register`, {  // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          username: data.username,  // Assuming you also collect username
        }),
      });

      const result = await response.json();
       console.log(response)
      if (response.ok) {
        setMessage('User Registered Successfully');
        alert('User Registered Successfully');
        navigate('/login');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Error: Unable to register user');
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("Google Sign-In started");
    try {
      await googleSignIn();
      alert("Signed in with Google successfully");
      navigate("/"); // Redirect to the home page after successful sign-in
    } catch (error) {
      alert(`Error with Google sign-in: ${error.message}`);
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              UserName
            </label>
            <input
              {...register('username', { required: true })}
              type="text"
              id="username"
              placeholder="User Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
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
            Register
          </button>
        </form>

        <p className="align-baseline font-medium mt-4 text-sm">
          Have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>

        {/* Google sign-in */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Register;
