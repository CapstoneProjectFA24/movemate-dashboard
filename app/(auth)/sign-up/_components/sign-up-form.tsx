"use client";

import React, { useState, useTransition } from "react";
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
import { ITruckCategory } from "@/features/services/types/services-type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/lib/uploadthing";
import { createAccount } from "@/features/auth/auth-action";
import { useRouter } from "nextjs-toploader/app";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

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
  truckCategoryId: z.number(),
  color: z.string(),
  brand: z.string(),
  capacity: z.number(),
  model: z.string(),
  numberPlate: z.string(),
});

const documentSchema = z.object({
  userInfo: z.array(
    z.object({
      type: z.string(),
      imageUrl: z.string().optional(),
      value: z.string().optional(),
    })
  ),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
type DocumentFormValues = z.infer<typeof documentSchema>;

interface SignUpFormProps {
  truckCategorys: ITruckCategory[] | null;
}

const SignUpForm = ({ truckCategorys }: SignUpFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [documentFiles, setDocumentFiles] = useState<{
    [key: string]: string | null;
  }>({});
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const personalInfoForm = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: undefined,
      password: undefined,
      truckCategoryId: 0,
      color: "",
      brand: "",
      capacity: 0,
      model: "",
      numberPlate: "",
    },
  });

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
        { type: "PORTRAIT", imageUrl: "", value: "" },
        { type: "CITIZEN_IDENTIFICATION_CARD", imageUrl: "", value: "" },
        { type: "HEALTH_CERTIFICATE", imageUrl: "", value: "" },
        { type: "DRIVER_LICENSE", imageUrl: "", value: "" },
        { type: "CRIMINAL_RECORD", imageUrl: "", value: "" },
        { type: "CURRICULUM_VITAE", imageUrl: "", value: "" },
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
      const updatedUserInfo = documentData.userInfo.map((info) => ({
        ...info,
        imageUrl: documentFiles[info.type] || "",
      }));
      const finalData = {
        roleId: 4,
        ...formattedData,
        ...documentData,
        userInfo: updatedUserInfo,
      };
      startTransition(async () => {
        const result = await createAccount(finalData);

        if (!result.success) {
          toast.error(result.error);
        } else {
          personalInfoForm.reset();
          documentForm.reset();
          toast.success("Đăng ký thành công");
          router.push("/sign-in");
        }
      });
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
              <FormField
                control={personalInfoForm.control}
                name="truckCategoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 block mb-2">
                      Loại xe
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại xe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full p-2 bg-slate-800 text-slate-100 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500">
                        {truckCategorys!.map(
                          (category) =>
                            category && (
                              <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                              >
                                {category.categoryName}
                              </SelectItem>
                            )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 block mb-2">
                      Nhãn hiệu xe
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập nhãn hiệu xe"
                        className="bg-slate-800 border-slate-700 focus:ring-2 focus:ring-emerald-500 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage className="text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 block mb-2">
                      Màu sắc của xe
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập màu sắc"
                        className="bg-slate-800 border-slate-700 focus:ring-2 focus:ring-emerald-500 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage className="text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 block mb-2">
                      Mẫu xe
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="mẫu xe"
                        className="bg-slate-800 border-slate-700 focus:ring-2 focus:ring-emerald-500 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage className="text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="numberPlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 block mb-2">
                      Biển số xe
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập biển số xe"
                        className="bg-slate-800 border-slate-700 focus:ring-2 focus:ring-emerald-500 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage className="text-sm mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200 block mb-2">
                      Dung tích xe
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );

      case 2:
        return (
          <Form {...documentForm}>
            <form className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {documentForm.getValues("userInfo").map((info, index) => (
                <FormItem key={info.type} className="flex flex-col">
                  <FormLabel className="text-slate-200 block mb-2">
                    {documentTypeLabels[info.type] || info.type}
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      {!documentFiles[info.type] && (
                        <UploadButton
                          appearance={{
                            button:
                              "bg-orange-500 text-white rounded-md px-4 py-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                            container:
                              "w-full border-2 border-dashed border-orange-300 rounded-md p-4 flex flex-col items-center justify-center",
                            allowedContent: "text-gray-500 text-sm mb-2",
                          }}
                          endpoint="serverImage"
                          onClientUploadComplete={(res) => {
                            setDocumentFiles((prev) => ({
                              ...prev,
                              [info.type]: res[0].url,
                            }));

                            documentForm.setValue(
                              `userInfo.${index}.imageUrl`,
                              res[0].url
                            );

                            toast.success("Thêm tư liệu thành công");
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`);
                          }}
                        />
                      )}
                      {documentFiles[info.type] && (
                        <div className="mt-2">
                          {/* <img 
                                src={documentFiles[info.type]} 
                                alt={`Uploaded ${documentTypeLabels[info.type] || info.type}`}
                                className="max-w-full h-40 object-cover rounded-lg"
                              /> */}
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-slate-300 break-words">
                              {documentFiles[info.type]}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm mt-1" />
                </FormItem>
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

export default SignUpForm;
