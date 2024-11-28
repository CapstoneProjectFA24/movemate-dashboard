"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ImageUploadOne } from "@/components/image-cloudinary-upload/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/image-uploadthing/file-upload";
import { toast } from "sonner";
import { createServices } from "../../action/create-service";

export const serviceSchema = z
  .object({
    name: z
      .string()
      .min(3, "Tên dịch vụ phải có ít nhất 3 ký tự")
      .max(100, "Tên dịch vụ không được vượt quá 100 ký tự"),
    description: z
      .string()
      .min(10, "Mô tả phải có ít nhất 10 ký tự")
      .max(500, "Mô tả không được vượt quá 500 ký tự"),
    isTierZeroOverride: z.boolean().default(true),
    isActived: z.boolean().default(true),
    imageUrl: z.string(),
    type: z.string().min(1, "Loại dịch vụ không được để trống"),
    amount: z.number().min(0, "Số tiền không được âm"),
    tier: z.number().nullable(),
    discountRate: z
      .number()
      .min(0, "Tỷ lệ giảm giá không được âm")
      .max(100, "Tỷ lệ giảm giá không được vượt quá 100%"),
    isQuantity: z.boolean().default(false),
    quantityMax: z
      .number()
      .int("Số lượng tối đa phải là số nguyên")
      .min(1, "Số lượng tối đa phải lớn hơn 0")
      .nullable()
      .optional(),
    truckCategoryId: z.number().int("ID loại xe phải là số nguyên").optional(),
    parentServiceId: z
      .number()
      .int("ID dịch vụ cha phải là số nguyên")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "TRUCK" && !data.truckCategoryId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "TruckCategoryId là bắt buộc khi Type là Truck",
        path: ["truckCategoryId"],
      });
    }

    // validate tiếp sau
  });
export type ServiceSchemaType = z.infer<typeof serviceSchema>;
const serviceTypes = [
  { value: "SYSTEM", label: "Hệ thống" },
  { value: "DISASSEMBLE", label: "Tháo lắp" },
  { value: "PORTER", label: "Bốc vác" },
  { value: "TRUCK", label: "Vận chuyển" },
  { value: "CUSTOM", label: "Tùy chỉnh" },
];
export const CreateServicesModal = () => {
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "createServicesModal";
  const serviceData = data.service;
  const truckCategorys = data.truckCategorys;
  const parentServiceId = serviceData?.id;

  const form = useForm<ServiceSchemaType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      isActived: true,
      isQuantity: false,
      isTierZeroOverride: false,
      discountRate: 0,
      amount: 0,
      tier: 1,
      parentServiceId: parentServiceId,
      imageUrl: "",
      type: serviceData?.type || "",
    },
  });

  const { watch, setValue } = form;
  useEffect(() => {
    if (serviceData?.id) {
      setValue("parentServiceId", serviceData.id);
      setValue('type', serviceData.type);
    }
  }, [serviceData, setValue]);
  const typedata = watch("type");
  const isQuantity = watch("isQuantity");

  const onSubmit = (data: ServiceSchemaType) => {
    console.log("form data :", data);
    try {
      startTransition(async () => {
        const result = await createServices(data);

        if (!result.success) {
          toast.error(result.error);
        } else {
          toast.success("Cập nhật dịch vụ thành công !");
        }
      });
    } catch (error) {
      console.error("có lỗi khi trong quá trình submit form:", error);
    }
  };
  const isLoading = form.formState.isLoading;

  const handleClose = () => {
    form.reset();
    onClose();
  };
  return (
    <Dialog open={isOpenModal} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Thêm dịch vụ
          </DialogTitle>
          <DialogDescription>
            Chọn dịch vụ bạn muốn thêm vào đơn này.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
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

              <div className="">
                <div className="grid grid-cols-2 gap-6">
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
                          disabled={!!serviceData?.type}
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

                {typedata === "TRUCK" && (
                  <FormField
                    control={form.control}
                    name="truckCategoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loại xe</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
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
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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

            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="isActived"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div>
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
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div>
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
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập mô tả dịch vụ"
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Đang xử lý..." : "Tạo dịch vụ"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
