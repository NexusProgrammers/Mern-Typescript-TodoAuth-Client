import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ScreenSpinner, UsePageTitle } from "../components";
import {
  MailRoundedIcon,
  VisibilityOffRoundedIcon,
  VisibilityRoundedIcon,
} from "../icons";
import { useSignInUserMutation } from "../redux/authApi";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { SignInError, SignInResponse, UserSignInData } from "../vite-env";

const SignIn: FC = () => {
  UsePageTitle("Sign In");
  const navigate = useNavigate();

  const [signInUser, { isLoading }] = useSignInUserMutation();

  const [formData, setFormData] = useState<UserSignInData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signInUser(formData);
    if ("data" in response) {
      const { token, message } = response?.data as SignInResponse;
      toast.success(message, {
        duration: 2000,
      });
      const oneDayInSeconds = 60 * 60 * 24;
      const expires = new Date(new Date().getTime() + oneDayInSeconds * 1000);
      Cookies.set("token", token, {
        sameSite: "Strict",
        secure: true,
        path: "/",
        expires,
      });
      window.location.reload();
      navigate("/");
    }
    if ("error" in response) {
      const {
        data: { message },
      } = response?.error as SignInError;
      toast.error(message, {
        duration: 2000,
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6">
      {isLoading && <ScreenSpinner />}

      <div className="w-[26rem] p-14 shadow-md hover:shadow-xl rounded-md bg-white">
        <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="w-full relative">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="mt-1 p-2 w-full rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MailRoundedIcon
              fontSize="small"
              className="absolute right-3 top-8 text-gray-700"
            />
          </div>
          <div className="w-full relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {showPassword ? (
                <VisibilityRoundedIcon
                  fontSize="small"
                  className="absolute right-3 top-4 text-gray-700 cursor-pointer"
                  onClick={handleTogglePasswordVisibility}
                />
              ) : (
                <VisibilityOffRoundedIcon
                  fontSize="small"
                  className="absolute right-3 top-4 text-gray-700 cursor-pointer"
                  onClick={handleTogglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
          <Link
            to={"/signup"}
            className="flex justify-center hover:text-blue-900"
          >
            <p>Don't Have An Account</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
