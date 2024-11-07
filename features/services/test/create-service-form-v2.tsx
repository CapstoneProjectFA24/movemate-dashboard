"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { serviceSchema, ServiceSchemaType } from "./services-schema-v2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploadOne } from "@/components/image-cloudinary-upload/image-upload";
const CreateServiceForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ServiceSchemaType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      isActived: true,
      isQuantity: false,
      isTierZeroOverride: true,
      discountRate: 0,
      amount: 0,
      imageUrl: "",
      inverseParentService: [],
    },
  });

  const { watch, setValue } = form;
  const isTierZeroOverride = watch("isTierZeroOverride");
  const type = watch("type");
  const isQuantity = watch("isQuantity");
  const parentServiceId = watch("parentServiceId");

  const onSubmit = async (data: ServiceSchemaType) => {
    try {
      setIsLoading(true);
      console.log("Form data:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddChildService = () => {
    const currentServices = form.getValues("inverseParentService") || [];
    setValue("inverseParentService", [
      ...currentServices,
      {
        name: "",
        // description: "",
        // isActived : true,
        // imageUrl : '',
        type: type ,
        // discountRate: 0,
        // amount: 0,
        // isQuantity: false,
      },
    ]);
  };

  const handleRemoveChildService = (index: number) => {
    const currentServices = form.getValues("inverseParentService") || [];
    setValue(
      "inverseParentService",
      currentServices.filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <Tabs defaultValue="basic" className="w-full">
              <div className="flex-col-reverse">
                {!isTierZeroOverride && (
                  <div className="flex justify-center ">
                    <TabsList className="flex flex-row h-40 w-72 rounded-lg border bg-background shadow-sm">
                      <TabsTrigger
                        value="basic"
                        className="justify-start rounded-none  data-[state=active]:bg-muted"
                      >
                        Thông tin dịch vụ
                      </TabsTrigger>
                      <TabsTrigger
                        value="child-services"
                        className="justify-start  rounded-none data-[state=active]:bg-muted"
                      >
                        Dịch vụ con
                      </TabsTrigger>
                    </TabsList>
                  </div>
                )}

                <div className="">
                  <TabsContent value="basic">
                    <Card>
                      <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                          <CardTitle>Thông tin dịch vụ</CardTitle>

                          <FormField
                            control={form.control}
                            name="isTierZeroOverride"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-4 justify-between  p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">
                                    Dịch vụ con
                                  </FormLabel>
                                  <FormDescription>Cho phép</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={!field.value} 
                                    onCheckedChange={(checked) => field.onChange(!checked)}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Basic Information */}
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
                                  onChange={(imageUrl) =>
                                   field.onChange(imageUrl)
                                  }
                                  onRemove={() => field.onChange(null)}
                                />
                              </FormControl>
                              <FormMessage className="dark:text-yellow-300" />
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
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    // Cập nhật type cho tất cả dịch vụ con khi type cha thay đổi
                                    const childServices = form.getValues("inverseParentService") || [];
                                    if (childServices.length > 0) {
                                      setValue(
                                        "inverseParentService",
                                        childServices.map(service => ({
                                          ...service,
                                          type: value
                                        }))
                                      );
                                    }
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn loại dịch vụ" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="TRUCK">Truck</SelectItem>
                                    <SelectItem value="OTHER">Khác</SelectItem>
                                    {!isTierZeroOverride && (
                                      <SelectItem value="CUSTOM">
                                        Tùy chỉnh
                                      </SelectItem>
                                    )}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Service Configuration */}
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
                                    Có số lượng
                                  </FormLabel>
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
                                <Textarea
                                  placeholder="Nhập mô tả dịch vụ"
                                  {...field}
                                  rows={4}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {type === "TRUCK" && (
                          <FormField
                            control={form.control}
                            name="truckCategoryId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Loại xe</FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(parseInt(value))
                                  }
                                  defaultValue={field.value?.toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn loại xe" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {/* Add your truck categories here */}
                                    <SelectItem value="1">Loại xe 1</SelectItem>
                                    <SelectItem value="2">Loại xe 2</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="child-services">
                    <Card>
                      <CardHeader>
                        <CardTitle>Thông tin dịch vụ</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {!isTierZeroOverride && !parentServiceId && (
                          <>
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold">
                                Dịch vụ con
                              </h3>
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

                            {form
                              .watch("inverseParentService")
                              ?.map((_, index) => (
                                <Card key={index}>
                                  <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 gap-6">
                                      <FormField
                                        control={form.control}
                                        name={`inverseParentService.${index}.name`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Tên dịch vụ con
                                            </FormLabel>
                                            <FormControl>
                                              <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <div className="flex items-end justify-end">
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          size="icon"
                                          onClick={() =>
                                            handleRemoveChildService(index)
                                          }
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Tạo dịch vụ"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateServiceForm;
