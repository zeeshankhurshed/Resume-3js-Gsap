
import React, { useState } from 'react';
import WebCam from '../components/Webcam';
import { BASEURL } from '../utils/constants';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Zod schema for validation
const signInSchema = z.object({
  descriptor: z.array(z.number()).min(1, "Descriptor is required"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [descriptorCaptured, setDescriptorCaptured] = useState(false);
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      descriptor: [],
    },
  });

  const handleDescriptorCapture = (desc) => {
    setValue("descriptor", desc);
    setDescriptorCaptured(true);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Form data:", data);

      const res = await fetch(`${BASEURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          descriptor: data.descriptor,
        }),
      });

      const result = await res.json();
      // console.log(result);
      
      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
         toast("Login successful!");
      }

      if (result.token) {
        localStorage.setItem("token", result.token);
      }
      // toast("User login Successfully")
      navigate("/")
      return { success: true, user: result.user };
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen m-auto gap-2">

    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 ">
      <WebCam onDescriptorCaptured={handleDescriptorCapture} />

      {errors.descriptor && (
        <p className="text-red-500">{errors.descriptor.message}</p>
      )}

       <button
        type="submit"
        className="w-full bg-[#6060f5] text-white py-2 rounded-md opacity-95 hover:opacity-75 font-bold cursor-pointer mt-1"
        >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
        </div>
  );
};

export default Login;
