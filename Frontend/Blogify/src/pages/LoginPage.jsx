import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getUsername, signin } from "@/services/apiBlog";
import { toast } from "react-toastify";
import SmallSpinner from "@/ui_components/SmallSpinner";
import InputError from "@/ui_components/InputError";

const LoginPage = ({ setIsAuthenticated, setUsername }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
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
      toast.success("You have successfully signed in!");
      navigate(location?.state?.from?.pathname || "/", { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-8 sm:py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="surface w-full max-w-md space-y-6 p-6 sm:p-8">
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to continue to Blogify.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" disabled={isLoading} placeholder="your_username"
            {...register("username", { required: "Username is required" })} />
          {errors.username && <InputError error={errors.username.message} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" disabled={isLoading} placeholder="••••••••"
            {...register("password", { required: "Password is required" })} />
          {errors.password && <InputError error={errors.password.message} />}
        </div>

        <div className="space-y-4">
          <Button type="submit" disabled={isLoading} className="h-10 w-full">
            {isLoading ? <><SmallSpinner /> Signing in...</> : "Sign in"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
