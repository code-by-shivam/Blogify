import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { createBlog, updateBlog } from "@/services/apiBlog";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputError from "@/ui_components/InputError";
import SmallSpinner from "@/ui_components/SmallSpinner";
import { MdCloudUpload } from "react-icons/md";
import { BASE_URL } from "@/api";
import LoginPage from "./LoginPage";

const CATEGORIES = [
  "Technology",
  "Economy",
  "Business",
  "Sports",
  "Lifestyle",
];

const CreatePostPage = ({
  blog,
  isAuthenticated,
  setIsAuthenticated,
  setUsername,
  toggleModal,
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: blog
      ? {
        title: blog.title || "",
        content: blog.content || "",
        category: blog.category || "",
      }
      : {
        title: "",
        content: "",
        category: "",
      },
  });

  const blogID = blog?.id;
  const image = watch("featured_image");
  const category = watch("category");

  const [imagePreview, setImagePreview] = useState(
    blog?.featured_image
      ? blog.featured_image.startsWith("http")
        ? blog.featured_image
        : `${BASE_URL}${blog.featured_image}`
      : null
  );

  /* ================= IMAGE PREVIEW ================= */
  useEffect(() => {
    if (image && image.length > 0 && image[0] instanceof File) {
      const preview = URL.createObjectURL(image[0]);
      setImagePreview(preview);
      return () => URL.revokeObjectURL(preview);
    }
  }, [image]);

  /* ================= SUBMIT ================= */
  async function onSubmit(data) {
    if (!data.category) {
      toast.error("Category is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("category", data.category);

      if (data.featured_image && data.featured_image[0] instanceof File) {
        formData.append("featured_image", data.featured_image[0]);
      }

      if (blog && blogID) {
        await updateBlog(formData, blogID);
        toast.success("Post updated successfully");
      } else {
        await createBlog(formData);
        toast.success("Post created successfully");
      }

      toggleModal ? toggleModal() : navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ================= AUTH CHECK ================= */
  if (isAuthenticated === false) {
    return (
      <LoginPage
        setIsAuthenticated={setIsAuthenticated}
        setUsername={setUsername}
      />
    );
  }

  /* ================= UI ================= */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        my-14 w-full max-w-3xl mx-auto
        p-10 rounded-2xl
        bg-white dark:bg-[#1E2030]
        border border-gray-100 dark:border-gray-800
        shadow-xl dark:shadow-none
        flex flex-col gap-8
      "
    >
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        {blog ? "Update Post" : "Create New Post"}
      </h2>

      {/* ================= TITLE ================= */}
      <div className="space-y-2">
        <Label className="text-gray-900 dark:text-white">Title</Label>
        <Input
          {...register("title", { required: "Title is required" })}
          placeholder="Enter title"
          className="
            h-12 rounded-lg
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-[#141624]
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-blue-500
          "
        />
        {errors.title && <InputError error={errors.title.message} />}
      </div>

      {/* ================= CATEGORY ================= */}
      <div className="space-y-2">
        <Label className="text-gray-900 dark:text-white">Category</Label>

        <Select
          value={category}
          onValueChange={(value) =>
            setValue("category", value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        >
          <SelectTrigger
            className="
              h-12 rounded-lg
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-[#141624]
              text-gray-900 dark:text-white
            "
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent className="dark:bg-[#1E2030] dark:border-gray-700">
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat} className="cursor-pointer">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.category && <InputError error={errors.category.message} />}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="space-y-2">
        <Label className="text-gray-900 dark:text-white">Content</Label>
        <Textarea
          rows={7}
          {...register("content", {
            required: "Content is required",
            minLength: { value: 10, message: "Minimum 10 characters" },
          })}
          className="
            rounded-lg
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-[#141624]
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-blue-500
            resize-none
          "
        />
        {errors.content && <InputError error={errors.content.message} />}
      </div>

      {/* ================= IMAGE ================= */}
      <div className="space-y-2">
        <Label className="text-gray-900 dark:text-white">Featured Image</Label>

        <label
          className="
            relative flex flex-col items-center justify-center
            h-[280px]
            rounded-xl
            border-2 border-dashed border-gray-300 dark:border-gray-700
            bg-gray-50 dark:bg-[#141624]
            hover:border-blue-500
            cursor-pointer
            transition
            overflow-hidden
          "
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
              <MdCloudUpload size={42} />
              <p className="mt-2 text-sm">Click to upload image</p>
            </div>
          )}

          <Input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("featured_image")}
          />
        </label>
      </div>

      {/* ================= SUBMIT ================= */}
      <button
        disabled={isSubmitting}
        className="
          h-12 rounded-xl
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white font-semibold
          hover:from-blue-700 hover:to-indigo-700
          transition
          disabled:opacity-70
        "
      >
        {isSubmitting ? (
          <div className="flex justify-center">
            <SmallSpinner />
          </div>
        ) : blog ? (
          "Update Post"
        ) : (
          "Publish Post"
        )}
      </button>
    </form>
  );
};

export default CreatePostPage;
