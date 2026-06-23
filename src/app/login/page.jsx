"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";

const LoginPage = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const { data: signInData, error: signInError } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (signInError) {
                toast.error(signInError.message || "Registration not succeed...");
                return;
            }

            toast.success("Login successful");
            router.push("/");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
            toast.success("Signin successful");
        } catch (err) {
            console.log(err);
            toast.error("Google login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative"
            style={{
                background: "linear-gradient(135deg, #EEF2FF 0%, #E8EFFE 100%)",
            }}
        >
            {/* TOP ACCENT BAR */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#2563EB]" />

            <Card className="w-full max-w-md p-8 rounded-2xl bg-white border border-[#E8EFFE] shadow-xl">

                {/* HEADER */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-[#0A1F5C]">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-[#6B7280] mt-1">
                        Access your Ticketo account and purchase event tickets.
                    </p>
                </div>

                {/* FORM */}
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 w-full"
                >
                    {/* EMAIL */}
                    <TextField 
                        isRequired 
                        isInvalid={!!errors.email}
                    >
                        <Label className="text-[#0A1F5C]">Email Address</Label>
                        <Input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            placeholder="Enter your email"
                            className="border border-[#E8EFFE] focus:border-[#2563EB]"
                        />
                        <FieldError>{errors.email?.message}</FieldError>
                    </TextField>

                    {/* PASSWORD */}
                    <TextField 
                        isRequired 
                        isInvalid={!!errors.password}
                    >
                        <Label className="text-[#0A1F5C]">Password</Label>
                        <Input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Minimum 8 characters required",
                                },
                            })}
                            type="password"
                            placeholder="••••••••"
                            className="border border-[#E8EFFE] focus:border-[#2563EB]"
                        />
                        <Description className="text-[#6B7280] text-xs">
                            Must be at least 8 characters
                        </Description>
                        <FieldError>{errors.password?.message}</FieldError>
                    </TextField>

                    {/* LOGIN BUTTON */}
                    <Button
                        type="submit"
                        className="w-full bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#0A1F5C] transition-all"
                    >
                        <Check />
                        Sign In
                    </Button>
                </Form>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 my-4">
                    <div className="flex-grow border-t border-[#E8EFFE]" />
                    <span className="text-xs text-[#6B7280] font-semibold uppercase">Or Login With</span>
                    <div className="flex-grow border-t border-[#E8EFFE]" />
                </div>

                {/* GOOGLE LOGIN */}
                <Button
                    onClick={handleGoogleLogin}
                    className="w-full bg-white border border-[#E8EFFE] text-[#0A1F5C] font-semibold hover:bg-[#EEF2FF] transition-all"
                >
                    <FaGoogle className="text-[#2563EB]" />
                    Continue with Google
                </Button>

                {/* SIGNUP LINK */}
                <p className="text-center text-sm text-[#6B7280] mt-5">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="text-[#2563EB] font-semibold hover:text-[#0A1F5C] hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </Card>
        </div>
    );
};

export default LoginPage;