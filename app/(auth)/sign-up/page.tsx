"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];



const personalInfoSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z
    .string()
    .regex(/^0\d{9}$/, { message: "Số điện thoại không hợp lệ" }),
  dob: z.string().refine(
    (date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate < new Date();
    },
    { message: "Ngày sinh không hợp lệ" }
  ),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Vui lòng chọn giới tính" }),
  }),
  password: z.string(),
});

const documentSchema = z.object({
  userInfo: z.array(
    z.object({
      type: z.string(),
      imageUrl: z.any()
        .optional()
        .refine(
          (file) => {
            if (!file) return true;
            return file instanceof File;
          },
          "Must be a valid file"
        )
        .refine(
          (file) => {
            if (!file) return true;
            return file.size <= MAX_FILE_SIZE;
          },
          `Max file size is 5MB`
        )
        .refine(
          (file) => {
            if (!file) return true;
            return ACCEPTED_FILE_TYPES.includes(file.type);
          },
          "Only .jpg, .jpeg, .png and .pdf files are accepted"
        ),
      value: z.string().optional(),
    })
  ),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
type DocumentFormValues = z.infer<typeof documentSchema>;

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  // Form hooks for each step
  const personalInfoForm = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: undefined,
      password: undefined,
    },
  });

  // Document type translations
  const documentTypeLabels: Record<string, string> = {
    PORTRAIT: "Ảnh chân dung",
    CITIZEN_IDENTIFICATION_CARD: "CMND/CCCD",
    HEALTH_CERTIFICATE: "Giấy khám sức khỏe",
    DRIVER_LICENSE: "Bằng lái xe",
    CRIMINAL_RECORD: "Lý lịch tư pháp",
    CURRICULUM_VITAE: "Hồ sơ xin việc",
  };

  const documentForm = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      userInfo: [
        { type: "PORTRAIT", imageUrl: undefined, value: "" },
        { type: "CITIZEN_IDENTIFICATION_CARD", imageUrl: undefined, value: "" },
        { type: "HEALTH_CERTIFICATE", imageUrl: undefined, value: "" },
        { type: "DRIVER_LICENSE", imageUrl: undefined, value: "" },
        { type: "CRIMINAL_RECORD", imageUrl: undefined, value: "" },
        { type: "CURRICULUM_VITAE", imageUrl: undefined, value: "" },
      ],
    },
  });

  const nextStep = () => {
    switch (currentStep) {
      case 1:
        personalInfoForm.handleSubmit((data) => {
          setFormData((prev: any) => ({ ...prev, ...data }));
          setCurrentStep(2);
        })();
        break;

      case 2:
        documentForm.handleSubmit(handleFinalSubmit)();
        break;
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = async (documentData: DocumentFormValues) => {
    try {
      const formattedData = {
        ...formData,
        dob: new Date(formData.dob).toISOString(),
      };
      const finalData = {
        roleId: 4,
        ...formattedData,
        ...documentData,
        userInfo: documentData.userInfo.map((info) => ({
          ...info,
          imageUrl: info.imageUrl ? URL.createObjectURL(info.imageUrl) : "",
        })),
      };

      // Replace with your API call
      // const response = await signUp(finalData);
      console.log("Final Form Data:", finalData);
      toast.success("Đăng ký thành công");
    } catch (error) {
      toast.error("Đăng ký thất bại");
      console.error(error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form {...personalInfoForm}>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={personalInfoForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel className="text-slate-200 block mb-2">
                      Họ và Tên
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập họ và tên"
                        className="bg-slate-800 border-slate-700 focus:ring-2 focus:ring-emerald-500 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage className="text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 block mb-2">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Nhập email"
                        className="bg-slate-800 border-slate-700 focus:ring-2 focus:ring-emerald-500 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage className="text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 block mb-2">
                      Số điện thoại
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập số điện thoại"
                        className="bg-slate-800 border-slate-700 focus:ring-2 focus:ring-emerald-500 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage className="text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 block mb-2">
                      Ngày sinh
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="bg-slate-800 border-slate-700 focus:ring-2 focus:ring-emerald-500 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage className="text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 block mb-2">
                      Giới tính
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                        <option value="Other">Khác</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 block mb-2">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="off"
                        placeholder="Nhập mật khẩu"
                        className="bg-slate-800 border-slate-700 focus:ring-2 focus:ring-emerald-500 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage className="text-sm mt-1" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );

      case 2:
        return (
          <Form {...documentForm}>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documentForm.getValues("userInfo").map((info, index) => (
                <FormField
                  key={info.type}
                  control={documentForm.control}
                  name={`userInfo.${index}.imageUrl`}
                  render={({ field }) => {
                    // Get the file value from field
                    const fileValue = field.value as File | undefined;

                    return (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-slate-200 block mb-2">
                          {documentTypeLabels[info.type] || info.type}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <label className="flex">
                              <span className="bg-orange-400 hover:bg-orange-500 text-white rounded-l-lg px-4 py-2 cursor-pointer">
                                Chọn tệp
                              </span>
                              <span className="bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 rounded-r-lg flex-grow">
                                {fileValue?.name || "Chưa chọn tệp nào"}
                              </span>
                              <input
                                type="file"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  field.onChange(file);
                                }}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage className="text-sm mt-1" />
                      </FormItem>
                    );
                  }}
                />
              ))}
            </form>
          </Form>
        );
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 to-emerald-900 flex items-center justify-center p-4 bg-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/container-truck-ship-port-ai-generated-image_511042-612.jpg')`,
      }}
    >
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-orange-400 mb-2">
              MoveMate
            </h2>
            <p className="text-slate-300">Đăng ký tài khoản mới</p>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center mb-8">
            {[1, 2].map((step) => (
              <div
                key={step}
                className={`w-12 h-2 mx-2 rounded-full transition-colors duration-300 ${
                  currentStep === step
                    ? "bg-orange-400"
                    : currentStep > step
                    ? "bg-orange-400"
                    : "bg-slate-600"
                }`}
              />
            ))}
          </div>

          <div className="mb-8">{renderStep()}</div>

          <div className="flex justify-between space-x-4">
            {currentStep > 1 && (
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="w-1/2 text-slate-300 border-slate-700 hover:bg-slate-700"
              >
                Quay lại
              </Button>
            )}
            <Button
              type="button"
              onClick={nextStep}
              className={`${
                currentStep === 1 ? "w-full" : "w-1/2"
              } bg-orange-400 hover:bg-orange-500 text-white`}
            >
              {currentStep === 2 ? "Đăng ký" : "Tiếp tục"}
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-slate-400">
              Bạn đã có tài khoản?{" "}
              <a
                href="/sign-in"
                className="text-orange-400 hover:text-orange-500"
              >
                Đăng nhập
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
