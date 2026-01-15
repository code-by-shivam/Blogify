import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import InputError from "@/ui_components/InputError";
import { useState, useEffect } from "react";
import { createBlog, updateBlog } from "@/services/apiBlog";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "@/ui_components/SmallSpinner";
import SmallSpinnerText from "@/ui_components/SmallSpinnerText";
import { BASE_URL } from "@/api";
import { MdCloudUpload } from "react-icons/md";
import LoginPage from "./LoginPage";

const CreatePostPage = ({ blog, isAuthenticated, setIsAuthenticated, setUsername, toggleModal }) => {
  const isModal = Boolean(toggleModal); // If toggleModal is passed, we are in a modal
  const { register, handleSubmit, formState, setValue, watch } = useForm({
    defaultValues: blog ? blog : {},
  });
  const { errors } = formState;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const blogID = blog?.id;
  const image = watch("featured_image_url");
  const [imagePreview, setImagePreview] = useState(
    blog?.featured_image_url
      ? (blog.featured_image_url.toString().startsWith("http")
        ? blog.featured_image_url
        : `${BASE_URL}${blog.featured_image_url}`)
      : null
  );

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      if (file instanceof File) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        return () => URL.revokeObjectURL(previewUrl);
      }
    }
  }, [image]);

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("Category", data.Category);

      if (data.featured_image_url && data.featured_image_url.length > 0) {
        if (data.featured_image_url[0] instanceof File) {
          formData.append("featured_image_url", data.featured_image_url[0]);
        }
      }

      if (blog && blogID) {
        await updateBlog(formData, blogID);
        // If in modal, close it and reload or fetch again. For now, navigate and toast.
        // Actually, if in modal, we might want to stay on page? 
        // Original behavior was navigate('/').
        navigate("/");
        toast.success("Your post has been updated successfully!");
        console.log("Your post has been updated successfully!");
        if (toggleModal) toggleModal(); // Close modal if present
      } else {
        await createBlog(formData);
        toast.success("New post added successfully");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
      console.log("Error submitting blog", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isAuthenticated === false) {
    return <LoginPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${isModal
        ? "max-h-[90vh] overflow-y-auto w-full max-w-4xl p-8 rounded-xl scrollbar-hide"
        : "my-10 w-full max-w-3xl p-8 rounded-xl shadow-2xl"
        } flex flex-col mx-auto items-center gap-8 bg-white dark:shadow-none dark:bg-[#1E2030] dark:text-white transition-all duration-300 border border-gray-100 dark:border-gray-800`}
    >
      <div className="flex flex-col gap-2 justify-center items-center text-center w-full">
        <h3 className="font-bold text-3xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {blog ? "Update Post" : "Create New Post"}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
          {blog
            ? "Refine your content and keep it fresh."
            : "Share your thoughts and ideas with the world."}
        </p>
      </div>

      <div className="w-full space-y-6">
        {/* Title Section */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base font-medium dark:text-gray-200">
            Title
          </Label>
          <Input
            type="text"
            id="title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
            placeholder="Enter an engaging title..."
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-[#141624] dark:focus:border-blue-500 transition-all font-medium"
          />
          {errors?.title?.message && <InputError error={errors.title.message} />}
        </div>

        {/* Category Section */}
        <div className="space-y-2">
          <Label htmlFor="Category" className="text-base font-medium dark:text-gray-200">Category</Label>
          <Select
            {...register("Category", { required: "Category is required" })}
            onValueChange={(value) => setValue("Category", value)}
            defaultValue={blog ? blog.Category : ""}
          >
            <SelectTrigger className="w-full px-4 py-3 h-auto rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-[#141624] dark:focus:border-blue-500 transition-all bg-transparent">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#1E2030] dark:border-gray-700">
              <SelectGroup>
                <SelectLabel className="dark:text-gray-400">Categories</SelectLabel>
                {["Technology", "Economy", "Buisness", "Sports", "LifeStyle"].map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="cursor-pointer focus:bg-blue-50 dark:focus:bg-[#141624] dark:text-gray-200"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors?.Category?.message && (
            <InputError error={errors.Category.message} />
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-2">
          <Label htmlFor="content" className="text-base font-medium dark:text-gray-200">Content</Label>
          <Textarea
            id="content"
            placeholder="Write your masterpiece here..."
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 10,
                message: "Content must be at least 10 characters",
              },
            })}
            className="w-full min-h-[250px] px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-[#141624] dark:focus:border-blue-500 transition-all resize-y text-base leading-relaxed"
          />
          {errors?.content?.message && (
            <InputError error={errors.content.message} />
          )}
        </div>

        {/* Image Upload Section */}
        <div className="space-y-2">
          <Label htmlFor="featured_image_url" className="text-base font-medium dark:text-gray-200">Featured Image</Label>
          <div className="relative group flex flex-col items-center justify-center w-full">
            <Label
              htmlFor="featured_image_url"
              className="flex flex-col items-center justify-center w-full h-[300px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-[#141624] dark:bg-[#141624] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 overflow-hidden relative transition-colors"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <MdCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}
              <Input
                type="file"
                id="featured_image_url"
                {...register("featured_image_url", {
                  required: blog ? false : "Featured image is required",
                })}
                className="hidden"
                accept="image/*"
              />
            </Label>
          </div>
          {errors?.featured_image_url?.message && (
            <InputError error={errors.featured_image_url.message} />
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full pt-4">
        <button
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-3">
              <SmallSpinner />
              <span className="text-lg">
                {blog ? "Updating Post..." : "Publishing Post..."}
              </span>
            </div>
          ) : (
            <span className="text-lg">
              {blog ? "Update Post" : "Publish Post"}
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CreatePostPage;