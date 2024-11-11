"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import React from "react";
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
  IService,
  ITruckCategory,
} from "@/features/services/type/services-type";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ServiceSchemaType,
  serviceSchema,
} from "@/features/services/type/update-services-schema";
import { FaListCheck } from "react-icons/fa6";
import Image from "next/image";
import { Edit, Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { useParams } from "next/navigation";
import { updateService } from "../../action/update-service";
import { toast } from "sonner";
interface ServiceDetailUpdateFormProps {
  truckCategorys: ITruckCategory[] | null;
  service: IService | null;
}
const serviceTypes = [
  { value: "SYSTEM", label: "Hệ thống" },
  { value: "DISASSEMBLE", label: "Tháo lắp" },
  { value: "PORTER", label: "Bốc vác" },
  { value: "TRUCK", label: "Vận chuyển" },
  { value: "CUSTOM", label: "Tùy chỉnh" },
];
const ServiceDetailUpdateForm = ({
  truckCategorys,
  service,
}: ServiceDetailUpdateFormProps) => {
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ServiceSchemaType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service ?? {},
  });
  const { watch, setValue } = form;
  const type = watch("type");
  const isQuantity = watch("isQuantity");
  const isLoading = form.formState.isLoading;
  const { onOpen } = useModal();
  const onSubmit = async (data: ServiceSchemaType) => {
    try {
      startTransition(async () => {
        const result = await updateService(data, params.id.toString());

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

  return (
    <div className="p-6">
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-6 ">
              {/* Left Column - Main Details */}
              <div className="lg:w-3/4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">
                      Hình ảnh dịch vụ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hình ảnh</FormLabel>
                          <FormControl>
                            <ImageUploadOne
                              value={field.value}
                              disabled={isLoading}
                              onChange={(imageUrl) => field.onChange(imageUrl)}
                              onRemove={() => field.onChange(null)}
                            />
                          </FormControl>
                          <FormMessage className="dark:text-yellow-300" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Basic Information Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">
                      Thông tin cơ bản
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tên dịch vụ</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nhập tên dịch vụ"
                                {...field}
                              />
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
                              disabled={
                                service!?.inverseParentService.length >= 0
                              }
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
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
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
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mô tả</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Mô tả chi tiết về dịch vụ"
                              className="h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Additional Settings */}
              <div className="lg:w-1/3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">
                      Cài đặt dịch vụ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="isActived"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Trạng thái
                            </FormLabel>
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
                            <FormLabel className="text-base">
                              Tính theo số lượng
                            </FormLabel>
                            <FormDescription>
                              Bật nếu dịch vụ tính theo số lượng
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <FaListCheck className="h-5 w-5 mr-2 text-primary mt-1" />
                        Danh sách các dịch vụ con
                      </CardTitle>
                      <Button
                        onClick={() =>
                          onOpen("createServicesModal", {
                            service: service!,
                            truckCategorys: truckCategorys!,
                          })
                        }
                        variant="secondary"
                        type="button"
                        className="group hover:shadow-md bg-primary/10 hover:bg-primary/50 transition-transform duration-200 transform active:scale-95 rounded-full"
                      >
                        <Plus className="h-5 w-5 group-hover:scale-110 transition-transform duration-200 text-primary" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {service?.inverseParentService!?.length > 0 ? (
                      <div className="grid gap-4">
                        {service?.inverseParentService!.map((detail, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-lg bg-muted/40"
                          >
                            <div className="flex space-x-2 items-center">
                              <div>
                                <Image
                                  src={detail.imageUrl}
                                  alt="inverseParentService img"
                                  width={50}
                                  height={50}
                                  className="rounded-lg"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">
                                  Dịch vụ #{detail.id}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Tên: {detail.name}
                                </p>
                              </div>
                            </div>
                            <div>
                              <Button
                                size="icon"
                                variant="outline"
                                type="button"
                                className="hover:bg-primary/10"
                                onClick={() => {}}
                              >
                                <Edit className="h-4 w-4 text-primary" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        Chưa có dịch vụ nào được chọn
                      </p>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" type="button" disabled={isLoading}>
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ServiceDetailUpdateForm;
