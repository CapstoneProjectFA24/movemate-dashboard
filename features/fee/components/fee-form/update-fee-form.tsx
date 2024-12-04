"use client";
import { IService } from "@/features/services/types/services-type";
import { IFee } from "../../types/fee-type";
import { IHouse } from "@/features/services/types/house-type";
import React, { useEffect, useState, useTransition } from "react";
import { z } from "zod";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeeLable, FeeType } from "../../enums/fee-enum";
import { createFee } from "../../actions/create-fee";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { Textarea } from "@/components/ui/textarea";
import { updateFee } from "../../actions/update-fee";
import AlertModal from "@/components/modals/alert-modal";
import { deleteFee } from "../../actions/delete-fee";
interface FeeDetailUpdateFormProps {
  services: IService[] | null;
  fee: IFee | null;
  house: IHouse[] | null;
}

interface FilteredService {
  id: number;
  name: string;
}
const FeeDetailUpdateForm = ({
  services,
  fee,
  house,
}: FeeDetailUpdateFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [filteredServices, setFilteredServices] = useState<FilteredService[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const updateFeeSchema = (type: string) => {
    const baseSchema = {
      type: z.string(),
      name: z.string().min(1, "Tên phí là bắt buộc"),
      description: z.string(),
      amount: z.number().min(0, "Số tiền không được âm"),
      unit: z.union([z.string(), z.null()]),
    };

    if (type === FeeType.DRIVER || type === FeeType.PORTER) {
      return z.object({
        ...baseSchema,
        serviceId: z.number().min(1, "Vui lòng chọn dịch vụ"),
        houseTypeId: z.number().min(1, "Vui lòng chọn loại nhà"),
        floorPercentage: z.number().min(0, "Tỉ lệ không được âm"),
      });
    } else if (type === FeeType.TRUCK) {
      return z.object({
        ...baseSchema,
        serviceId: z.number().min(1, "Vui lòng chọn dịch vụ"),
        houseTypeId: z.number().optional(),
        floorPercentage: z.number().optional(),
      });
    } else {
      return z.object({
        ...baseSchema,
        serviceId: z.number().optional(),
        houseTypeId: z.number().optional(),
        floorPercentage: z.number().optional(),
      });
    }
  };
  const form = useForm({
    resolver: zodResolver(updateFeeSchema(fee?.type || "")),
    defaultValues: {
      type: fee?.type || "",
      name: fee?.name || "",
      description: fee?.description || "",
      amount: fee?.amount || 0,
      serviceId: fee?.serviceId || undefined,
      houseTypeId: fee?.houseTypeId || undefined,
      floorPercentage: fee?.floorPercentage || 0,
      unit: fee?.unit || null,
    },
  });
  const { watch, resetField, setValue } = form;
  const type = watch("type");
  const isChooseService =
    type === FeeType.DRIVER ||
    type === FeeType.PORTER ||
    type === FeeType.TRUCK;

  const isChoseFloorPercent =
    type === FeeType.DRIVER || type === FeeType.PORTER;
  function filterServices(services: IService[], type: string): IService[] {
    if (type === FeeType.TRUCK) {
      return services.filter((service) => service.type === FeeType.TRUCK);
    } else if (type === FeeType.PORTER || type === FeeType.DRIVER) {
      return services.filter((service) => service.type === FeeType.PORTER);
    } else {
      return services;
    }
  }

  function getUnitByFeeType(type: string): string | null {
    switch (type) {
      case FeeType.TRUCK:
        return "KM";
      case FeeType.SYSTEM:
        return "PERCENT";
      case FeeType.DRIVER || FeeType.PORTER:
        return "FLOOR";
      default:
        return null;
    }
  }

  useEffect(() => {
    const filteredParentServices = filterServices(services!, type);
    const filteredChildrenServices = filteredParentServices.reduce<
      FilteredService[]
    >((acc, service) => {
      acc.push(
        ...service.inverseParentService.map((child) => ({
          id: child.id,
          name: child.name,
        }))
      );
      return acc;
    }, []);
    setFilteredServices(filteredChildrenServices);
  }, [services, type]);

  useEffect(() => {
    const unit = getUnitByFeeType(type);
    setValue("unit", unit);
  }, [type, setValue]);

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      startTransition(async () => {
        const result = await updateFee(data, fee?.id.toString()!);

        if (!result.success) {
          toast.error(result.error);
        } else {
          toast.success("Câp nhật phí dịch vụ thành công !");
        }
      });
    } catch (error) {
      console.error("có lỗi khi trong quá trình submit form:", error);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      startTransition(async () => {
        const result = await deleteFee(fee?.id.toString()!);

        if (!result.success) {
          toast.error(result.error);
        } else {
          toast.success("Xóa thành công.");
          router.push(`/dashboard/fee`);
        }
      });
    } catch (error: any) {
      toast.error("Đã có lỗi.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        variant="danger"
        onConfirm={onDelete}
        loading={loading}
        title="Xóa loại phí"
        description="Bạn có chắc chắn muốn xóa loại phí này không?"
      />
      <div className="p-6">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="text-xl font-bold">
                      Chi tiết loại phí
                    </CardTitle>
                    <CardTitle>
                      <Button
                        variant="destructive"
                        size="sm"
                        type="button"
                        onClick={() => setOpen(true)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loại phí dịch vụ</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={field.value}
                            disabled
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn loại phí dịch vụ" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {FeeLable.map((type) => (
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
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên phí dịch vụ</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Nhập tên phí dịch vụ"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số tiền</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              } // Chuyển đổi sang số, nếu không phải số thì mặc định là 0
                              placeholder="Nhập số tiền"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {isChooseService && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl font-bold">
                            Chọn dịch vụ
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="serviceId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Dịch vụ</FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                  defaultValue={field.value?.toString()}
                                  value={
                                    field.value === 0
                                      ? ""
                                      : field.value?.toString()
                                  }
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn dịch vụ" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {filteredServices.map((service) => (
                                      <SelectItem
                                        key={service.id}
                                        value={service.id.toString()}
                                      >
                                        {service.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    )}

                    {isChoseFloorPercent && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl font-bold">
                            Loại nhà và Tỉ lệ cho Porter
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="houseTypeId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Loại nhà</FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                  defaultValue={field.value?.toString()}
                                  value={
                                    field.value === 0
                                      ? ""
                                      : field.value?.toString()
                                  }
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn loại nhà" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {house!.map((h) => (
                                      <SelectItem
                                        key={h.id}
                                        value={h.id.toString()}
                                      >
                                        {h.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="floorPercentage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tỉ lệ cho porter</FormLabel>
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
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Nhập mô tả " />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                      Hủy
                    </Button>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="relative"
                    >
                      {isPending ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader className="animate-spin h-5 w-5 text-white" />
                        </div>
                      ) : (
                        "Cập nhật"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FeeDetailUpdateForm;
