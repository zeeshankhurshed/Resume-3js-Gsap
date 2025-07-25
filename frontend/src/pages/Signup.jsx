import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import WebCam from "../components/Webcam";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../utils/constants";

// Validation schema
const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
    descriptor: z.array(z.number()).min(1, "Descriptor is required"),
    role: z.enum(["admin", "user"], {
      required_error: "Role is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Form fields
const formItems = [
  { id: 1, label: "Name", name: "name", type: "text" },
  { id: 2, label: "Email", name: "email", type: "email" },
  { id: 3, label: "Password", name: "password", type: "password" },
  {
    id: 4,
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
  },
];

export default function Signup({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [descriptorCaptured, setDescriptorCaptured] = useState(false);
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      descriptor: [],
      role: "user",
    },
  });

  const handleDescriptorCapture = (desc) => {
    setValue("descriptor", desc);
    setDescriptorCaptured(true);
    console.log("Captured descriptor:", desc);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("Submitting data:", data);

    try {
      const res = await fetch(`${BASEURL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration failed");
      }

      if (onSuccess) {
        onSuccess(result);
      }
      alert("Registration successful!");
      reset(); // Reset form after successful registration
      // navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[350px] mx-auto p-6 mt-20 md:mt-30 bg-[rgba(0,0,0,0.5)] shadow-lg rounded-lg space-y-4 border border-teal-400 "
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Signup Form
      </h2>

      {formItems.map((item) => (
        <div key={item.id} className="flex flex-col">
          <input
            type={item.type}
            {...register(item.name)}
            placeholder={item.label}
            className="border px-3 py-2 rounded-md text-sm focus:outline-blue-500"
          />
          {errors[item.name] && (
            <span className="text-red-500 text-xs mt-1">
              {errors[item.name].message}
            </span>
          )}
        </div>
      ))}

      {/* Role dropdown */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Role</label>
        <select
          {...register("role")}
          className="border px-3 py-2 rounded-md text-sm focus:outline-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && (
          <span className="text-red-500 text-xs mt-1">
            {errors.role.message}
          </span>
        )}
      </div>

      {/* Face descriptor capture */}
      <WebCam onDescriptorCaptured={handleDescriptorCapture} />
      {errors.descriptor && (
        <span className="text-red-500 text-xs mt-1">
          {errors.descriptor.message}
        </span>
      )}

      <button
        type="submit"
        className="w-full bg-[#6060f5] text-white py-2 rounded-md opacity-95 hover:opacity-75 font-bold cursor-pointer"
      >
        {isLoading ? "Sign In" : "Create Account"}
      </button>
    </form>
  );
}
