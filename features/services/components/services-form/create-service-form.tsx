"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploadOne } from "@/components/image-cloudinary-upload/image-upload";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ServiceSchemaType,
  serviceSchema,
} from "../../types/create-services-schema";
import { ITruckCategory } from "../../types/services-type";
import { createServices } from "../../action/create-service";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { FileUpload } from "@/components/image-uploadthing/file-upload";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamic import for React Quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface CreateServiceFormProps {
  truckCategorys: ITruckCategory[] | null;
}

const serviceTypes = [
  { value: "SYSTEM", label: "Hệ thống" },
  { value: "DISASSEMBLE", label: "Tháo lắp" },
  { value: "PORTER", label: "Bốc vác" },
  { value: "TRUCK", label: "Vận chuyển" },
  { value: "CUSTOM", label: "Tùy chỉnh" },
];
const CreateServiceForm = ({ truckCategorys }: CreateServiceFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ServiceSchemaType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      isActived: true,
      isQuantity: false,
      isTierZeroOverride: true,
      discountRate: 0,
      amount: 0,
      imageUrl: "",
    },
  });
  const { watch, setValue } = form;
  const type = watch("type");
  const isQuantity = watch("isQuantity");

  const onSubmit = async (data: ServiceSchemaType) => {
    try {
      startTransition(async () => {
        const result = await createServices(data);

        if (!result.success) {
          toast.error(result.error);
        } else {
          form.reset();
          toast.success("Cập nhật dịch vụ thành công !");
        }
      });
    } catch (error) {
      console.error("có lỗi khi trong quá trình submit form:", error);
    }
  };

  const isLoading = form.formState.isLoading;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">
                  Tạo mới dịch vụ
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hình ảnh</FormLabel>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên dịch vụ</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên dịch vụ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại dịch vụ</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại dịch vụ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {type === "TRUCK" && (
                <FormField
                  control={form.control}
                  name="truckCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại xe</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại xe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá tiền</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
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

                <FormField
                  control={form.control}
                  name="discountRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tỷ lệ giảm giá (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
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
              </div>

              {/* Switches */}
              <div className="grid grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="isActived"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Trạng thái</FormLabel>
                        <FormDescription>
                          Bật/tắt trạng thái hoạt động
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isQuantity"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Có số lượng</FormLabel>
                        <FormDescription>
                          Bật nếu dịch vụ này có giới hạn số lượng
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {isQuantity && (
                  <FormField
                    control={form.control}
                    name="quantityMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số lượng tối đa</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập số lượng tối đa"
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        className="border-2 border-orange-800 rounded-lg p-1 min-h-[60px] border-input bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Nhập mô tả..."
                        
                        style={{}}
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, false] }],
                            ["bold", "italic", "underline"],
                            ["image", "code-block"],
                            [{ list: "ordered" }, { list: "bullet" }],
                          ],
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading} className="relative">
              {isPending ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader className="animate-spin h-5 w-5 text-white" />
                </div>
              ) : (
                "Tạo dịch vụ"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateServiceForm;
