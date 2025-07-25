import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const addVideoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  videoUrl: z
    .any()
    .refine((file) => file?.length > 0, { message: "Video is required" }),
});

export default function AddVideo() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const UPLOAD_PRESET = "portfolio";
  const CLOUD_NAME = "dncayjzf6";

  const form = useForm({
    resolver: zodResolver(addVideoSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: undefined,
    },
  });

  const uploadToCloudinary = async (file, resourceType = "video") => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const json = await res.json();
    return json.secure_url;
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const videoFile = data.videoUrl[0];

      const videoUrl = await uploadToCloudinary(videoFile, "video");

      const payload = {
        title: data.title,
        description: data.description,
        videoUrl,
      };

      const response = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save video to database");
      }

      toast.success("Video uploaded successfully!");
      navigate("/videos");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-28">
      <div className="shadow-md bg-[rgba(0,0,0,0.5)] max-w-xl flex flex-col gap-6 justify-center items-center m-auto rounded-md p-6 text-white">
        <h2 className="text-2xl font-bold">Add Demo Project</h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="flex flex-col gap-4 w-full"
        >
          <input type="text" placeholder="Title" {...form.register("title")} />
          {form.formState.errors.title && (
            <p className="text-red-500">
              {form.formState.errors.title.message}
            </p>
          )}

          <textarea
            placeholder="Description"
            {...form.register("description")}
          />
          {form.formState.errors.description && (
            <p className="text-red-500">
              {form.formState.errors.description.message}
            </p>
          )}

          <input type="file" accept="video/*" {...form.register("videoUrl")} />
          {form.formState.errors.videoUrl && (
            <p className="text-red-500">
              {form.formState.errors.videoUrl.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded cursor-pointer"
          >
            {isLoading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
