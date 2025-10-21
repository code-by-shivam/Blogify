import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import InputError from "@/ui_components/InputError";

const CreatePostPage = () => {
  const { register, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;
  function onSubmit(data){
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:px-20 px-10 py-10 flex flex-col mx-auto my-12 items-center gap-8 w-fit rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl dark:from-[#1a1d2e] dark:to-[#141624] border border-gray-100 dark:border-gray-800 dark:text-white">
      <div className="flex flex-col gap-3 justify-center items-center mb-4">
        <h3 className="font-bold text-3xl bg-gradient-to-r from-[#4B6BFB] to-[#7c3aed] bg-clip-text text-transparent">
          Create Post
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Create a new post and share your ideas.
        </p>
      </div>

      <div>
        <Label
          htmlFor="title"
          className="text-gray-700 dark:text-gray-300 font-medium mb-2 block"
        >
          Title
        </Label>
        <Input
          type="text"
          id="title"
          {...register("title", {
            required: "Blog's title is required",
            minLength: {
              value: 3,
              message: "The title must be atleast 3 Characters",
            },
          })}
          placeholder="Give your post a title"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px]"
        />
        {errors?.title?.message && <InputError error={errors.title.message} />}
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          {...register("content", {
            required: "Blog's content is required.",
            minLength: {
              value: 10,
              message: "Content must be atleast 10 Character.",
            },
          })}
          placeholder="Write your blog post"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[400px] text-justify"
        />
        {errors?.content?.message && (
          <InputError error={errors.content.message} />
        )}
      </div>

      <div className="w-full">
        <Label htmlFor="Category">Category</Label>

        <Select
          {...register("Category", {
            required: "Blog's Category is required.",
          })}
          onValueChange={(Value) => setValue("Category", Value)}
        >
          <SelectTrigger className="border-2 border-gray-300 dark:border-[#3B3C4A] focus:border-[#4B6BFB] dark:focus:border-[#4B6BFB] transition-colors duration-200 focus:outline-0 h-[44px] w-full rounded-lg bg-white dark:bg-[#1a1d2e]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Economy">Economy</SelectItem>
              <SelectItem value="Buisness">Buisness</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
              <SelectItem value="LifeStyle">LifeStyle</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors?.Category?.message && <InputError error={errors.Category.message}/>}
      </div>

      <div className="w-full">
        <Label
          htmlFor="featured_image"
          className="text-gray-700 dark:text-gray-300 font-medium mb-2 block"
        >
          Featured Image
        </Label>
        <Input
          type="file"
          id="picture"
          {...register("featured_image", {
            required: "Blog's Featured image is required.",
          })}
          className="border-2 border-gray-300 dark:border-[#3B3C4A] focus:border-[#4B6BFB] dark:focus:border-[#4B6BFB] transition-colors duration-200 focus:outline-0 h-[44px] w-full rounded-lg bg-white dark:bg-[#1a1d2e] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#4B6BFB] file:text-white hover:file:bg-[#3d5ad4] file:cursor-pointer"
        />
        {errors?.featured_image?.message && <InputError error={errors.featured_image.message}/>}
      </div>

      <div className="w-full flex items-center justify-center flex-col my-4">
        <button className="bg-gradient-to-r from-[#4B6BFB] to-[#7c3aed] hover:from-[#3d5ad4] hover:to-[#6d28d9] text-white w-full py-3.5 px-2 rounded-lg flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
          Create post
        </button>
      </div>
    </form>
  );
};

export default CreatePostPage;
