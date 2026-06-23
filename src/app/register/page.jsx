"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";

import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
  Description,
} from "@heroui/react";

import { FaGoogle, FaImage } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { uploadImage } from "@/component/utils/uploadImage";

const Register = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log("FORM DATA:", data);

    if (!data.email || !data.password) {
      toast.error("Email and password required");
      return;
    }

    const imageFile = data.image[0];
    const imageUrl = await uploadImage(imageFile)
    // console.log(imageUrl);

    const { data: signUpData, error: signUpError } =
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
        image: imageUrl,
      });

    // console.log(signUpData, signUpError);

    if (signUpError) {
      toast.error(signUpError.message || "Registration failed");
      return;
    }

    toast.success("Account created successfully");
    router.push("/");
  };

  console.log(errors);

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
    toast.success("Google sign in successful");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-indigo-50 to-blue-100">
      <Card className="w-full max-w-lg p-8 shadow-xl rounded-2xl bg-white">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900 pt-6">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-500">
            Join BookSphere today
          </p>
        </div>

        {/* FORM */}
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* NAME */}
          <TextField>
            <Label>Full Name</Label>
            <Input
              {...register("name", { required: true })}
              placeholder="Enter your name"
            />
          </TextField>

          {/* IMAGE */}
          <TextField>
            <Label>Profile Image</Label>

            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="w-full border p-2 rounded"
            />

            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </TextField>

          {/* EMAIL */}
          <TextField>
            <Label>Email</Label>
            <Input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
            />
          </TextField>

          {/* PASSWORD */}
          <TextField>
            <Label>Password</Label>
            <Input
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
              placeholder="Enter password"
            />
            <Description>
              Minimum 8 characters required
            </Description>
          </TextField>

          <TextField>
            <Label className="text-sm font-semibold text-slate-300">
              Select Role
            </Label>

            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="user"
                  {...register("role", { required: "Role is required" })}
                  className="accent-blue-600"
                  defaultChecked
                />
                <span>User</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="librarian"
                  {...register("role", { required: "Role is required" })}
                  className="accent-blue-600"
                />
                <span>Librarian</span>
              </label>
            </div>

            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role.message}
              </p>
            )}
          </TextField>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2 hover:bg-blue-800"
          >
            <IoMdCheckmarkCircleOutline className="mr-2" /> Create Account
          </Button>
        </Form>

        {/* DIVIDER */}
        <div className="text-center text-gray-400 text-sm">
          OR
        </div>

        {/* GOOGLE LOGIN */}
        <Button
          onClick={handleGoogleSignin}
          className="w-full border flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md"
        >
          <FaGoogle />
          Continue with Google
        </Button>

        {/* LOGIN LINK */}
        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;