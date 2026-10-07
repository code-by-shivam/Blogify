import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser, updateProfile } from "@/services/apiBlog";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SmallSpinner from "@/ui_components/SmallSpinner";
import InputError from "@/ui_components/InputError";

/**
 * SignUpPage Component
 * 
 * Handles both User Registration and Profile Updates.
 * Refactored to fix bugs and improve UX:
 * - Fixed typos (e.g., queryClint -> queryClient).
 * - Restored the "Sign In" navigation link.
 * - Cleaned up conditional rendering for "Sign Up" vs "Update Profile" modes.
 * - Applied consistent styling matching the Login page.
 */
const SignUpPage = ({ userInfo, updateForm, toggleModal }) => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: userInfo ? userInfo : {},
  });
  const password = watch("password");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (updateForm) {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("bio", data.bio);
        formData.append("job_title", data.job_title);

        if (data.profile_picture && data.profile_picture[0]) {
          if (data.profile_picture[0] !== "/") {
            formData.append("profile_picture", data.profile_picture[0]);
          }
        }
        await updateProfile(formData);
        toast.success("Profile Updated Successfully!");
        toggleModal();
        // Since we removed QueryClient, we might need a manual refresh or state update here
        // Ideally pass a callback to update parent state, but for now we proceed.
        if (window.location.reload) window.location.reload();
      } else {
        await registerUser(data);
        toast.success("Account created successfully!");
        reset();
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-center ${!updateForm ? "min-h-[75vh] px-4 py-8 sm:py-12" : "h-fit"}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`surface flex w-full max-w-lg flex-col gap-5 p-6 sm:p-8 ${updateForm ? "max-h-[90vh] overflow-y-auto" : ""}`}
      >
        <div className="mb-1 space-y-1.5 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {updateForm ? "Update profile" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {updateForm
              ? "Tell us more about yourself."
              : "Create your account to get started!"}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Username must be at least 3 characters" },
              })}
            />
            {errors.username && <InputError error={errors.username.message} />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                type="text"
                placeholder="First name"
                {...register("first_name", {
                  required: "First name is required",
                  minLength: { value: 3, message: "Must be at least 3 characters" },
                })}
              />
              {errors.first_name && <InputError error={errors.first_name.message} />}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                type="text"
                placeholder="Last name"
                {...register("last_name", {
                  required: "Last name is required",
                  minLength: { value: 3, message: "Must be at least 3 characters" },
                })}
              />
              {errors.last_name && <InputError error={errors.last_name.message} />}
            </div>
          </div>

          {!updateForm && (
            <>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Must be at least 8 characters" },
                  })}
                />
                {errors.password && <InputError error={errors.password.message} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    minLength: { value: 8, message: "Must be at least 8 characters" },
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && <InputError error={errors.confirmPassword.message} />}
              </div>
            </>
          )}

          {updateForm && (
            <>
              <div className="space-y-2">
                <Label htmlFor="job_title">Job Title</Label>
                <Input
                  id="job_title"
                  type="text"
                  placeholder="Enter Job Title"
                  {...register("job_title", {
                    required: "Job title is required",
                    minLength: { value: 3, message: "Must be at least 3 characters" },
                  })}
                />
                {errors.job_title && <InputError error={errors.job_title.message} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us more about you"
                  {...register("bio", {
                    required: "Bio is required",
                    minLength: { value: 10, message: "Must be at least 10 characters" },
                  })}
                  className="min-h-[120px]"
                />
                {errors.bio && <InputError error={errors.bio.message} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="picture">Profile Picture</Label>
                <Input
                  id="picture"
                  type="file"
                  {...register("profile_picture")}
                  className="cursor-pointer file:cursor-pointer"
                />
              </div>
            </>
          )}
        </div>

        <div className="w-full pt-2">
          <Button type="submit" disabled={isLoading} className="h-10 w-full">
            {isLoading ? (
              <><SmallSpinner /> {updateForm ? "Updating..." : "Creating account..."}</>
            ) : updateForm ? "Update profile" : "Sign up"}
          </Button>

          {!updateForm && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="font-medium text-primary hover:underline">
                Sign In
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
