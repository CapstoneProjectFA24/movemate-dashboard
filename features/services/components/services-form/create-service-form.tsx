"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { ITruckCategory } from "../../type/services-type";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { serviceSchema, ServiceSchemaType } from "../../type/services-schema";

interface CreateServiceFormProps {
  truckCategorys: ITruckCategory[] | null;
  onSubmit?: (data: ServiceSchemaType) => void;
}

const serviceTypes = [
  { value: "STANDARD", label: "Tiêu chuẩn" },
  { value: "PREMIUM", label: "Cao cấp" },
  { value: "CUSTOM", label: "Tùy chỉnh" },
];

const CreateServiceForm = ({
  truckCategorys,
  onSubmit,
}: CreateServiceFormProps) => {
  const form = useForm<ServiceSchemaType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      isActived: true,
      tier: 0,
      type: "",
      amount: 0,
      imageUrl: "",
      isQuantity: false,
      quantityMax: 0, // Avoid undefined for number fields
      parentServiceId: 0, // If optional, leave as undefined but ensure conditional handling
      truckCategoryId: 0, // As above, ensure conditional handling if undefined
      inverseParentService: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "inverseParentService",
  });

  const handleSubmit = async(data: ServiceSchemaType) => {

      try {
        console.log(data)
      } catch (error) {
        console.error('Form submission error:', error);
      }
  };
  const handleAddChildService = () => {
    append({
      name: "",
      description: "",
      isActived: true,
      tier: 0,
      type: "",
      amount: 0,
      imageUrl: "",
      isQuantity: false,
    });
  };
  const isQuantity = form.watch("isQuantity");
  const tier = form.watch("tier");
  const serviceType = form.watch("type");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin dịch vụ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
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
                    <Select onValueChange={field.onChange} value={field.value}>
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

              <FormField
                control={form.control}
                name="tier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cấp độ dịch vụ</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={"0"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn cấp độ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Cấp 0 (Dịch vụ gốc)</SelectItem>
                        <SelectItem value="1">Cấp 1 (Dịch vụ con)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {tier === 1 && (
                <FormField
                  control={form.control}
                  name="parentServiceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Dịch vụ cha</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập ID dịch vụ cha"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nhập mô tả dịch vụ" {...field} />
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
                    <FormLabel>Giá tiền</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập giá tiền"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Hình ảnh</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập URL hình ảnh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {serviceType === "Truck" && truckCategorys && (
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
                          {truckCategorys.map(
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
onChange={(e) => field.onChange(Number(e.target.value))}
                         
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Child Services Section */}
            {tier === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Dịch vụ con</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddChildService}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm dịch vụ con
                  </Button>
                </div>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <Card key={field.id}>
                      <CardContent className="pt-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name={`inverseParentService.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tên dịch vụ con</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`inverseParentService.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mô tả</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`inverseParentService.${index}.amount`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Giá tiền</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Hủy
          </Button>
          <Button type="submit">Tạo dịch vụ</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateServiceForm;
