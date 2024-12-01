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
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeeLable, FeeType } from "../../enums/fee-enum";
import { createFee } from "../../actions/create-fee";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { Textarea } from "@/components/ui/textarea";
import { updateFee } from "../../actions/update-fee";
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
  const router = useRouter();
  const feeSchema = z.object({
    type: z.string(),
    name: z.string(),
    description: z.string(),
    amount: z.number(),
    floorPercentage: z.number(),
    serviceId: z.number(),
    houseTypeId: z.number(),
    unit: z.union([z.string(), z.null()]),
  });
  const form = useForm<z.infer<typeof feeSchema>>({
    resolver: zodResolver(feeSchema),
    defaultValues: fee ?? {},
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

  const onSubmit = async (data: z.infer<typeof feeSchema>) => {
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

  return (
    <div className="p-6">
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Chi tiết loại phí
                </CardTitle>
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
                                    : field.value.toString()
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
                                    : field.value.toString()
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
  );
};

export default FeeDetailUpdateForm;
