"use client";
import { ITruckCategory } from "@/features/services/types/services-type";
import React, { useState, useTransition } from "react";
import { truckCategorySchema } from "../../types/truck-category-schema";
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
export type TruckCategoryFormValue = z.infer<typeof truckCategorySchema>;
interface TruckCategoryFormProps {
  initialData: ITruckCategory | null;
}

const TruckCategoryForm = ({ initialData }: TruckCategoryFormProps) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const title = initialData ? "Chỉnh sửa loại xe" : "Tạo loại xe";
  const description = initialData
    ? "chỉnh sửa một loại xe."
    : "Thêm một loại xe mới";
  const toastMessage = initialData
    ? "loại xe cập nhật thành công."
    : "loại xe được tạo thành công .";
  const action = initialData ? "Lưu thay đổi" : "Tạo";

  const defaultValues = initialData
    ? initialData
    : {
        categoryName: "",
        maxload: 0,
        description: "",
        imageUrl: "",
        estimatedLenght: "",
        estimatedWidth: "",
        estimatedHeight: "",
      };

  const form = useForm<TruckCategoryFormValue>({
    resolver: zodResolver(truckCategorySchema),
    defaultValues,
  });

  const onSubmit = async (data: TruckCategoryFormValue) => {
    try {
      if (initialData) {
        startTransition(async () => {
          const result = await updateTruckCategory(
            data,
            params.truckCategoryId.toString()
          );

          if (!result.success) {
            toast.error(result.error);
          } else {
            toast.success(toastMessage);
          }
        });
      } else {
        startTransition(async () => {
          const result = await createTruckCategory(data);

          if (!result.success) {
            toast.error(result.error);
          } else {
            toast.success(toastMessage);
          }
        });
        form.reset();
      }
    } catch (error: any) {
      toast.error("Đã có lỗi.", error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (initialData)
      try {
        setLoading(true);
        startTransition(async () => {
          const result = await deleteTruckCategory(
            params.truckCategoryId.toString()
          );

          if (!result.success) {
            toast.error(result.error);
          } else {
            toast.success("Xóa thành công.");
            router.push(`/dashboard/services_setting`);
          }
        });
      } catch (error: any) {
        toast.error("Đã có lỗi.");
      } finally {
        setLoading(false);
        setOpen(false);
      }
    else return;
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
        title="Xóa loại xe"
        description="Bạn có chắc chắn muốn xóa loại xe này không?"
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
              <Card>
                <CardContent>
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
                </CardContent>
              </Card>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 space-x-4 p-4">
                  <FormFieldCustom
                    control={form.control}
                    name="categoryName"
                    label="Tên loại xe"
                    placeholder="Nhập tên loại xe"
                    min={1}
                    // disabled={loading || !canReview}
                    className="w-full"
                  />

                  <FormField
                    control={form.control}
                    name="maxLoad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trọng tải</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            } // Chuyển đổi sang số, nếu không phải số thì mặc định là 0
                            placeholder="Nhập trọng tải"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 space-x-4">
                  <FormFieldCustom
                    control={form.control}
                    name="estimatedLenght"
                    label="Chiều dài"
                    placeholder="Nhập chiều dài"
                    min={1}
                    // disabled={loading || !canReview}
                    className="w-full"
                  />
                  <FormFieldCustom
                    control={form.control}
                    name="estimatedWidth"
                    label="Chiều rộng"
                    placeholder="Nhập chiều rộng"
                    min={1}
                    // disabled={loading || !canReview}
                    className="w-full"
                  />
                  <FormFieldCustom
                    control={form.control}
                    name="estimatedHeight"
                    label="Chiều cao"
                    placeholder="Nhập chiều cao"
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
                onClick={() => router.push("/dashboard/services_setting")}
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

export default TruckCategoryForm;
