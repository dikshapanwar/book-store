import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from "../utils/baseUrl";


function AdminLogin() {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${getBaseUrl()}/api/auth/admin`,data,{
        headers: {
          "Content-Type": "application/json",
        }
      });
      const auth=response.data;
      console.log(auth);
      if(auth.token){
        localStorage.setItem("token",auth.token);
        setTimeout(() => {
         localStorage.removeItem("token");
         alert("Token is Expired");
        }, 86400000);
        alert("Login Successful");
        navigate("/admin/dashboard");
      }
      else{
        alert("Invalid credentials");
      }
    } catch (error) {
      setMessage("Please enter a valid email and password");
      console.log(error);
    }
  };
  return (
    <div className=" h-screen flex justify-center items-center ">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Login</h2>

        <form onClick={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              name="username"
              id="username"
              placeholder="User Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 items-center text-white font-bold py-2 px-8 rounded focus:outline-none">
              Login{" "}
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
