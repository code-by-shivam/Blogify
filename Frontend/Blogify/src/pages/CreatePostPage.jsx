import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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

  
  useEffect(() => {
    if (image && image.length > 0 && image[0] instanceof File) {
      const preview = URL.createObjectURL(image[0]);
      setImagePreview(preview);
      return () => URL.revokeObjectURL(preview);
    }
  }, [image]);

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


  if (isAuthenticated === false) {
    return (
      <LoginPage
        setIsAuthenticated={setIsAuthenticated}
        setUsername={setUsername}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="surface mx-auto my-10 flex h-fit w-full max-w-3xl flex-col gap-7 p-6 sm:p-10"
    >
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">
          {blog ? "Update post" : "Create a new post"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {blog ? "Make changes to your story." : "Share your ideas with the community."}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Give your post a title" className="h-11"
          {...register("title", { required: "Title is required" })} />
        {errors.title && <InputError error={errors.title.message} />}
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={category} onValueChange={(value) => setValue("category", value, { shouldValidate: true, shouldDirty: true })}>
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat} className="cursor-pointer">{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <InputError error={errors.category.message} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" rows={10} placeholder="Write your story..." className="min-h-56 resize-y leading-relaxed"
          {...register("content", {
            required: "Content is required",
            minLength: { value: 10, message: "Minimum 10 characters" },
          })} />
        {errors.content && <InputError error={errors.content.message} />}
      </div>

      <div className="space-y-2">
        <Label>Featured image</Label>
        <label className="relative flex h-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-muted/40 transition-colors hover:border-primary hover:bg-accent/40">
          {imagePreview ? (
            <img src={imagePreview} alt="preview" className="size-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <MdCloudUpload size={36} />
              <p className="text-sm">Click to upload an image</p>
            </div>
          )}
          <Input type="file" accept="image/*" className="hidden" {...register("featured_image")} />
        </label>
      </div>

      <div className="flex justify-end gap-3 border-t pt-6">
        {toggleModal && (
          <Button type="button" variant="outline" size="lg" onClick={toggleModal}>Cancel</Button>
        )}
        <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-36">
          {isSubmitting ? <SmallSpinner /> : blog ? "Update post" : "Publish post"}
        </Button>
      </div>
    </form>
  );
};

export default CreatePostPage;
