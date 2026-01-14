import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getUsername, signin } from "@/services/apiBlog";
import { toast } from "react-toastify";
import SmallSpinner from "@/ui_components/SmallSpinner";

/**
 * LoginPage Component
 * 
 * Refactored to improve UI consistency and code readability.
 * Changes made:
 * - Corrected text labels (e.g., "Signed in" instead of "Signed up").
 * - Simplified JSX structure and removed unnecessary inline styles.
 * - Replaced console.log statements with proper error handling.
 * - Standardized styling using Tailwind CSS utility classes.
 */
const LoginPage = ({ setIsAuthenticated, setUsername }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  /* Refactored to remove TanStack Query references */
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await signin(data);
      localStorage.setItem("access", response.access);
      localStorage.setItem("refresh", response.refresh);
      setIsAuthenticated(true);
      const userRes = await getUsername();
      setUsername(userRes.username);
      toast.success("You have successfully signed in!!");
      const from = location?.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 px-10 py-8 bg-white dark:bg-[#141624] rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-2xl dark:text-white">Sign In</h3>
          <p className="text-gray-500 dark:text-gray-400">Welcome back! Log in to continue.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="dark:text-gray-300">Username</Label>
            <Input
              id="username"
              type="text"
              disabled={isLoading}
              placeholder="Enter username"
              {...register("username", { required: "Username is required" })}
              className="dark:border-[#3B3C4A] dark:text-white"
            />
            {errors.username && (
              <small className="text-red-500">{errors.username.message}</small>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="dark:text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              disabled={isLoading}
              placeholder="Enter password"
              {...register("password", { required: "Password is required" })}
              className="dark:border-[#3B3C4A] dark:text-white"
            />
            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4B6BFB] hover:bg-[#3b5bdb] text-white py-2.5 rounded-md flex items-center justify-center transition-colors disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <SmallSpinner />
                <span>Signing in...</span> {/* Corrected from "Signing up..." */}
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <p className="text-sm text-center dark:text-gray-400">
            {/* Corrected "signup" to "Sign up" */}
            Don't have an account? <Link to="/signup" className="text-[#4B6BFB] hover:underline">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;