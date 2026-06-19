"use client";

import { authClient } from "@/lib/auth-client";
import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    Separator,
    TextField,
} from "@heroui/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const Register = () => {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // Upload image to imgbb
        console.log(data);

        
        // const imageFile = data.image[0];
        // const imageUrl = await uploadImage(imageFile)
        // console.log(imageUrl);


        const { data: signUpData, error: signUpError } = await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            image: data.image,
            role: data.role
        })

        console.log(signUpData, signUpError);

        if (signUpError) {
            toast.error("Registration not succeed...")
        }
        else {
            redirect("/")
        }


    }
    console.log(errors);

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
        });

        toast.success("Signin successful");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12"
            style={{ background: "linear-gradient(135deg, #EEF2FF 0%, #E8EFFE 100%)" }}
        >
            {/* Accent top bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#2563EB]" />

            <Card className="w-full max-w-lg p-8 rounded-2xl bg-white border border-[#E8EFFE] shadow-xl">

                {/* LOGO / BRAND */}
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-2xl font-bold text-center text-[#0A1F5C] pt-4">
                        Create Your Account
                    </h1>
                    <p className="text-sm text-[#6B7280] mt-1">
                        Join BookSphere today
                    </p>
                </div>

                {/* FORM */}
                <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    {/* NAME */}
                    <TextField isRequired name="name">
                        <Label className="text-[#0A1F5C] font-medium text-sm">Full Name</Label>
                        <Input
                            placeholder="Enter your full name"
                            className="border border-[#E8EFFE] focus:border-[#2563EB] rounded-lg"
                        />
                        <FieldError />
                    </TextField>

                    {/* IMAGE */}
                    <TextField name="image" type="url">
                        <Label className="text-[#0A1F5C] font-medium text-sm">Profile Image URL</Label>
                        <Input
                            placeholder="https://example.com/photo.jpg"
                            className="border border-[#E8EFFE] focus:border-[#2563EB] rounded-lg"
                        />
                        <FieldError />
                    </TextField>

                    {/* EMAIL */}
                    <TextField isRequired name="email" type="email">
                        <Label className="text-[#0A1F5C] font-medium text-sm">Email Address</Label>
                        <Input
                            placeholder="Enter your email"
                            className="border border-[#E8EFFE] focus:border-[#2563EB] rounded-lg"
                        />
                        <FieldError />
                    </TextField>

                    {/* PASSWORD */}
                    <TextField isRequired minLength={8} name="password" type="password">
                        <Label className="text-[#0A1F5C] font-medium text-sm">Password</Label>
                        <Input
                            placeholder="Enter your password"
                            className="border border-[#E8EFFE] focus:border-[#2563EB] rounded-lg"
                        />
                        <Description className="text-[#6B7280] text-xs mt-1">
                            Must be at least 8 characters with uppercase and number
                        </Description>
                        <FieldError />
                    </TextField>

                    {/* REGISTER BUTTON */}
                    <Button
                        type="submit"
                        className="w-full bg-[#2563EB] text-white font-semibold rounded-lg py-2.5 hover:bg-[#0A1F5C] transition-all mt-2"
                    >
                        <IoMdCheckmarkCircleOutline className="text-lg" />
                        Create Account
                    </Button>
                </Form>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 my-1">
                    <span className="text-xs text-center mx-auto">OR</span>
                </div>

                {/* GOOGLE BUTTON */}
                <Button
                    onClick={handleGoogleSignin}
                    className="w-full bg-white text-[#0A1F5C] font-semibold rounded-lg py-2 border border-[#E8EFFE] hover:bg-[#EEF2FF] transition-all"
                >
                    <FaGoogle className="text-[#2563EB]" />
                    Sign in with Google
                </Button>

                {/* LOGIN LINK */}
                <p className="text-center text-sm text-[#6B7280] mt-5">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-[#2563EB] font-semibold hover:text-[#0A1F5C] hover:underline transition-colors"
                    >
                        Log in
                    </Link>
                </p>

            </Card>
        </div>
    );
};

export default Register;