"use client";
import React, { useTransition } from "react";
import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormFieldCustom from "@/components/form/form-field";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { createHouses } from "@/features/services/action/houses";
import { toast } from "sonner";
export const CreateHouseModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isOpenModal = isOpen && type === "createHouseModal";
  const [isPending, startTransition] = useTransition();
  const houseSchema = z.object({
    name: z.string(),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof houseSchema>>({
    resolver: zodResolver(houseSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof houseSchema>) => {
    try {
      startTransition(async () => {
        const result = await createHouses(data);

        if (!result.success) {
          toast.error(result.error);
        } else {
          form.reset();
          toast.success("Tạo loại nhà mới thành công");
          onClose();
        }
      });
    } catch (error: any) {
      console.log("Đã có lỗi", error);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo mới loại nhà</DialogTitle>
          <DialogDescription>
            Hãy tạo loại nhà hệ thống còn thiếu
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormFieldCustom
                control={form.control}
                name="name"
                label="Tên loại nhà"
                placeholder="Nhập tên loại nhà"
                min={1}
                // disabled={loading || !canReview}
                className="w-full"
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả chi tiết về loại nhà"
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">
                {isPending ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader className="animate-spin h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div>Tạo mới</div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
