"use client";
import { ITruckCategory } from "@/features/services/types/services-type";
import React, { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import FormFieldCustom from "@/components/form/form-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/image-uploadthing/file-upload";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import {
  createTruckCategory,
  deleteTruckCategory,
  updateTruckCategory,
} from "@/features/services/action/truck-category";
import AlertModal from "@/components/modals/alert-modal";
import { Input } from "@/components/ui/input";
import { IPromotion } from "../../types/promotion-type";
import { promotionSchema } from "../../types/promotion-schema";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTimePicker } from "@/components/shared/custom-ui/date-time-picker";
import { adjustTimeZoneOffset } from "@/hooks/use-countdown-time";
export type PromotionFormValue = z.infer<typeof promotionSchema>;
interface PromotionFormProps {
  initialData: IPromotion | null;
}

const PromotionForm = ({ initialData }: PromotionFormProps) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const title = initialData ? "Chỉnh sửa khuyến mãi" : "Tạo mới khuyến mãi";
  const description = initialData
    ? "Chỉnh sửa khuyến mãi."
    : "Thêm một khuyến mãi mới";

  const toastMessage = initialData
    ? "khuyến mãi cập nhật thành công."
    : "khuyến mãi được tạo thành công .";

  const action = initialData ? "Lưu thay đổi" : "Tạo";

  const defaultValues = initialData
    ? {
        ...initialData,

        startDate: initialData.startDate
          ? new Date(initialData.startDate)
          : undefined,
        endDate: initialData.endDate
          ? new Date(initialData.endDate)
          : undefined,
      }
    : {
        name: "",
        quantity: 0,
        price: 0,
        description: "",
        startDate: undefined,
        endDate: undefined,
        serviceId: 0,
        type: "",
      };

  const form = useForm<PromotionFormValue>({
    resolver: zodResolver(promotionSchema),
    defaultValues,
  });

  const onSubmit = async (data: PromotionFormValue) => {
    const startDateFormat = adjustTimeZoneOffset(data.startDate, 7);
    const endDateFormat = adjustTimeZoneOffset(data.endDate, 7);
    const value = {
      ...data,
      startDate: startDateFormat,
      endDate: endDateFormat,
    };
    console.log(value);
    // try {
    //   if (initialData) {
    //     startTransition(async () => {
    //       const result = await updateTruckCategory(
    //         data,
    //         params.truckCategoryId.toString()
    //       );
    //       if (!result.success) {
    //         toast.error(result.error);
    //       } else {
    //         toast.success(toastMessage);
    //       }
    //     });
    //   } else {
    //     startTransition(async () => {
    //       const result = await createTruckCategory(data);
    //       if (!result.success) {
    //         toast.error(result.error);
    //       } else {
    //         toast.success(toastMessage);
    //       }
    //     });
    //     form.reset();
    //   }
    // } catch (error: any) {
    //   toast.error("Đã có lỗi.", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const onDelete = async () => {
    // if (initialData)
    //   try {
    //     setLoading(true);
    //     startTransition(async () => {
    //       const result = await deleteTruckCategory(
    //         params.truckCategoryId.toString()
    //       );
    //       if (!result.success) {
    //         toast.error(result.error);
    //       } else {
    //         toast.success("Xóa thành công.");
    //         router.push(`/dashboard/services_setting`);
    //       }
    //     });
    //   } catch (error: any) {
    //     toast.error("Đã có lỗi.");
    //   } finally {
    //     setLoading(false);
    //     setOpen(false);
    //   }
    // else return;
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        variant="danger"
        onConfirm={onDelete}
        loading={loading}
        title="Xóa khuyến mãi"
        description="Bạn có chắc chắn muốn khuyến mãi này không?"
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {initialData && (
            <Button
              // disabled={loading}
              variant="destructive"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <Card>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 space-x-4 p-4">
                  <FormFieldCustom
                    control={form.control}
                    name="name"
                    label="Tên khuyến mãi"
                    placeholder="Nhập tên khuyến mãi..."
                    min={1}
                    // disabled={loading || !canReview}
                    className="w-full"
                  />
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="datetime">Ngày bắt đầu</FormLabel>
                        <FormControl>
                          <DateTimePicker
                            granularity="day"
                            jsDate={field.value ? new Date(field.value) : null}
                            onJsDateChange={field.onChange}
                            aria-label="Time Field"
                            // isDisabled={
                            //   field.value && new Date(field.value) < new Date()
                            // }
                            // isDisabled={notPermissionAlowEdit}
                          />
                        </FormControl>
                        <FormMessage className="dark:text-orange-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="datetime">Ngày kết thúc</FormLabel>
                        <FormControl>
                          <DateTimePicker
                            granularity="day"
                            jsDate={field.value ? new Date(field.value) : null}
                            onJsDateChange={field.onChange}
                            aria-label="Time Field"
                            //   isDisabled={notPermissionAlowEdit}
                          />
                        </FormControl>
                        {form.formState.errors.endDateInValid && (
                          <FormField
                            control={form.control}
                            name="endDateInValid"
                            render={() => (
                              <FormItem>
                                <FormMessage className="dark:text-orange-500" />
                              </FormItem>
                            )}
                          />
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 space-x-4 p-4">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số lượng vouchers</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            } // Chuyển đổi sang số, nếu không phải số thì mặc định là 0
                            placeholder="Nhập số lượng"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!initialData && (
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá khuyến mãi</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              } // Chuyển đổi sang số, nếu không phải số thì mặc định là 0
                              placeholder="Nhập giá của voucher"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 space-x-4 p-4">
                  <FormFieldCustom
                    control={form.control}
                    name="serviceId"
                    label="Tên dịch vụ"
                    placeholder="Nhập tên dịch vụ..."
                    min={1}
                    // disabled={loading || !canReview}
                    className="w-full"
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
                          placeholder="Mô tả chi tiết về loại xe"
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
            <div className="space-x-4 flex justify-end">
              <Button
                disabled={isLoading}
                variant="outline"
                className="ml-auto"
                type="button"
                onClick={() => router.push("/dashboard/promotions")}
              >
                Quay lại
              </Button>
              <Button disabled={isLoading} className="ml-auto" type="submit">
                {isPending ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader className="animate-spin h-5 w-5 text-white" />
                  </div>
                ) : (
                  action
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default PromotionForm;
