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
    Separator,
    TextField,
} from "@heroui/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";

const Login = () => {
    const router = useRouter();

    const onSubmit = async (data) => {
        const formData = new FormData(data.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data: signInData, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        if (signInData) {
            toast.success("Login successful");
            router.push("/");
        } else {
            toast.error(error?.message || "Login failed");
        }
    };

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
        });

        toast.success("Signin successful");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12"
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
                        Login to your BookSphere account
                    </p>
                </div>

                {/* FORM */}
                <Form onSubmit={onSubmit} className="flex flex-col gap-4">

                    {/* EMAIL */}
                    <TextField isRequired name="email" type="email">
                        <Label className="text-[#0A1F5C]">Email</Label>
                        <Input
                            placeholder="Enter your email"
                            className="border border-[#E8EFFE] focus:border-[#2563EB]"
                        />
                        <FieldError />
                    </TextField>

                    {/* PASSWORD */}
                    <TextField isRequired name="password" type="password">
                        <Label className="text-[#0A1F5C]">Password</Label>
                        <Input
                            placeholder="Enter your password"
                            className="border border-[#E8EFFE] focus:border-[#2563EB]"
                        />
                        <Description className="text-[#6B7280] text-xs">
                            Must be at least 8 characters
                        </Description>
                        <FieldError />
                    </TextField>

                    {/* LOGIN BUTTON */}
                    <Button
                        type="submit"
                        className="w-full bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#0A1F5C] transition-all"
                    >
                        <Check />
                        Login
                    </Button>
                </Form>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 my-1">
                    <span className="text-xs text-center mx-auto">OR</span>
                </div>

                {/* GOOGLE LOGIN */}
                <Button
                    onClick={handleGoogleSignin}
                    className="w-full bg-white border border-[#E8EFFE] text-[#0A1F5C] font-semibold hover:bg-[#EEF2FF] transition-all"
                >
                    <FaGoogle className="text-[#2563EB]" />
                    Continue with Google
                </Button>

                {/* SIGNUP LINK */}
                <p className="text-center text-sm text-[#6B7280] mt-5">
                    Don’t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-[#2563EB] font-semibold hover:text-[#0A1F5C] hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </Card>
        </div>
    );
};

export default Login;