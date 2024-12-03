"use client";
import { ITruckCategory } from "@/features/services/types/services-type";
import React from "react";
import { truckCategorySchema } from "../../types/truck-category-schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
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
import FormFieldCustom from "@/components/form/form-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/image-uploadthing/file-upload";
export type TruckCategoryFormValue = z.infer<typeof truckCategorySchema>;
interface TruckCategoryFormProps {
  initialData: ITruckCategory | null;
}

const TruckCategoryForm = ({ initialData }: TruckCategoryFormProps) => {
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

  const onSubmit = () => {};

  const isLoading = form.formState.isSubmitting;

  return (
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
            // onClick={() => setOpen(true)}
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
                <FormFieldCustom
                  control={form.control}
                  name="maxLoad"
                  label="Trọng tải"
                  placeholder="Nhập trọng tải"
                  min={1}
                  type="number"
                  // disabled={loading || !canReview}
                  className="w-full"
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
              //   onClick={() => router.push("/dashboard/products")}
            >
              Quay lại
            </Button>
            <Button disabled={isLoading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TruckCategoryForm;
