"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
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

import { FaGoogle } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // JS only

  const onSubmit = async (data) => {
    console.log("FORM DATA:", data);

    if (!data.email || !data.password) {
      toast.error("Email and password required");
      return;
    }

    const { data: signUpData, error: signUpError } =
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: data.image,
      });

    if (signUpError) {
      toast.error(signUpError.message || "Registration failed");
      return;
    }

    toast.success("Account created successfully");
    router.push("/");
  };

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
          <h1 className="text-2xl font-bold text-blue-900">
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
            <Label>Profile Image URL</Label>
            <Input
              {...register("image")}
              placeholder="https://example.com/image.jpg"
            />
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

          {/* ROLE (optional) */}
          <TextField>
            <Label>Role</Label>
            <select
              {...register("role")}
              className="w-full border rounded-lg p-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </TextField>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2"
          >
            <IoMdCheckmarkCircleOutline className="mr-2" />
            Create Account
          </Button>

        </Form>

        {/* DIVIDER */}
        <div className="my-4 text-center text-gray-400 text-sm">
          OR
        </div>

        {/* GOOGLE LOGIN */}
        <Button
          onClick={handleGoogleSignin}
          className="w-full border flex items-center justify-center gap-2"
        >
          <FaGoogle />
          Continue with Google
        </Button>

        {/* LOGIN LINK */}
        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

      </Card>
    </div>
  );
};

export default Register;