"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });

      if (!res?.error) {
        router.push(callbackUrl);
        toast.success("Đăng nhập thành công");
        form.reset();
      } else {
        toast.error("Tên đăng nhập hoặc mật khẩu sai");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra rồi");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <section
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/container-truck-ship-port-ai-generated-image_511042-612.jpg')`,
      }}
    >
      <div className="w-full max-w-4xl bg-gray-800 bg-opacity-60 rounded-3xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-lg">
          <div className="hidden lg:block">
            <div className="relative w-full h-full p-14">
              <Image
                src="/images/landing/loginsmall.jpg"
                alt="Login Image"
                objectFit="cover"
                layout="fill"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center p-10">
            <div className="mt-8 space-y-4 text-center">
              <h3 className="text-4xl font-semibold text-white tracking-tight">
                Đăng nhập
              </h3>
              <p className="text-lg text-gray-300 font-bold">
                Chào mừng đến với MoveMate!
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-10 space-y-6 max-w-xl m-4 min-w-full"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-base font-bold text-gray-200 mb-1">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          className="block w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-150 ease-in-out"
                          placeholder="Nhập email"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="block text-base font-bold text-gray-200 mb-1">
                        Mật khẩu
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            disabled={isLoading}
                            className="block w-full px-4 py-3 pr-10 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-150 ease-in-out"
                            placeholder="Nhập mật khẩu"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
                <div className="mt-8 text-center space-y-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#F4721E] hover:bg-[#e66a1b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
                  >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                  <Link
                    href="/"
                    className="inline-block text-[#F4721E] hover:text-[#e66a1b] font-medium transition duration-150 ease-in-out"
                  >
                    Trang chủ
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
