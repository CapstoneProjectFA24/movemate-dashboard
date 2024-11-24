"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetServicesToUpdateBooking } from "@/features/bookings/react-query/query";
import {
  ServiceType,
  ServiceTypeIcons,
} from "@/features/services/enums/service-enum";
import { IService } from "@/features/services/types/services-type";
import { toast } from "sonner";
import { updateBookingStatus } from "@/features/bookings/action/update-booking";
import {
  ChevronDown,
  ChevronUp,
  Package2,
  Truck,
  Settings,
} from "lucide-react";
import { MdBuildCircle } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { formatter } from "@/lib/utils";
export const CreateNewServicesBookingModal = () => {
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "createNewServicesBookingModal";
  const { data: services, isLoading } = useGetServicesToUpdateBooking(
    undefined,
    data.booking?.houseTypeId,
    data.booking?.floorsNumber,
    data.booking?.estimatedDistance
  );

  const bookingDetails = data.bookingDetails;

  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [expandedServices, setExpandedServices] = useState<{
    [key: string]: boolean;
  }>({});
  const [activeTab, setActiveTab] = useState<ServiceType>(ServiceType.SYSTEM);

  const typeLabels = {
    [ServiceType.SYSTEM]: "Hệ thống",
    [ServiceType.DISASSEMBLE]: "Tháo lắp",
    [ServiceType.PORTER]: "Khuân vác",
    [ServiceType.TRUCK]: "Xe tải",
  };

  const typeIcons = {
    [ServiceType.SYSTEM]: <Settings className="w-4 h-4" />,
    [ServiceType.DISASSEMBLE]: <MdBuildCircle className="w-4 h-4" />,
    [ServiceType.PORTER]: <Package2 className="w-4 h-4" />,
    [ServiceType.TRUCK]: <Truck className="w-4 h-4" />,
  };
  const handleSubmit = async () => {
    if (selectedServices.length === 0) {
      toast.error("Vui lòng chọn ít nhất một dịch vụ!");
      return;
    }

    const bookingDetailsToSend = selectedServices.map((service) => ({
      serviceId: service.id,
      quantity: quantities[service.id] || 0,
    }));

    if (bookingDetails) {
      bookingDetails.forEach((detail) => {
        if (
          !bookingDetailsToSend.some((bd) => bd.serviceId === detail.serviceId)
        ) {
          bookingDetailsToSend.push({
            serviceId: detail.serviceId,
            quantity: 0,
          });
        }
      });
    }

    const truckCategoryId = selectedServices.find(
      (service) => service.type === ServiceType.TRUCK
    )?.truckCategoryId;

    const dataToSend = truckCategoryId
      ? { bookingDetails: bookingDetailsToSend, truckCategoryId }
      : { bookingDetails: bookingDetailsToSend };

    console.log(dataToSend);

    startTransition(async () => {
      const result = await updateBookingStatus(
        params.id.toString(),
        dataToSend
      );
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Cập nhật dịch vụ thành công!");
    });
  };

  // check nếu có data thì làm như update nè !
  useEffect(() => {
    if (bookingDetails && services?.data) {
      const initialSelectedServices: IService[] = [];
      const initialQuantities: { [key: string]: number } = {};

      services.data.forEach((service) => {
        const mainServiceInBooking = bookingDetails.find(
          (bd) => bd.serviceId === service.id
        );
        if (mainServiceInBooking) {
          initialSelectedServices.push(service);
          initialQuantities[service.id.toString()] =
            mainServiceInBooking.quantity;
        }

        service.inverseParentService?.forEach((childService) => {
          const childServiceInBooking = bookingDetails.find(
            (bd) => bd.serviceId === childService.id
          );
          if (childServiceInBooking) {
            initialSelectedServices.push(childService);
            initialQuantities[childService.id.toString()] =
              childServiceInBooking.quantity;
          }
        });
      });

      setSelectedServices(initialSelectedServices);
      setQuantities(initialQuantities);
    }
  }, [bookingDetails, services]);

  const toggleExpand = (serviceId: string) => {
    setExpandedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const handleIncrease = (event: React.MouseEvent, serviceId: string) => {
    event.stopPropagation();
    const service = selectedServices.find((s) => s.id.toString() === serviceId);

    if (service && service.isQuantity) {
      const currentQuantity = quantities[serviceId] || 0;
      const maxQuantity = service.quantityMax || Infinity;

      if (currentQuantity < maxQuantity) {
        setQuantities((prev) => ({
          ...prev,
          [serviceId]: currentQuantity + 1,
        }));
      } else {
        toast.info(`Số lượng tối đa cho ${service.name} là ${maxQuantity}.`);
      }
    }
  };

  const handleDecrease = (event: React.MouseEvent, serviceId: string) => {
    event.stopPropagation();
    const currentQuantity = quantities[serviceId] || 0;

    if (currentQuantity > 0) {
      setQuantities((prev) => ({
        ...prev,
        [serviceId]: currentQuantity - 1,
      }));
    }
  };

  const handleServiceSelect = (
    service: IService,
    isChildService: boolean = false
  ) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.id === service.id);

      if (isSelected) {
        setQuantities((prevQuantities) => {
          const { [service.id]: removed, ...rest } = prevQuantities;
          return rest;
        });
        return prev.filter((s) => s.id !== service.id);
      }

      let newServices = [...prev];

      if (service.type === ServiceType.TRUCK) {
        newServices = prev.filter((s) => s.type !== ServiceType.TRUCK);
      }

      if (isChildService && service.type === ServiceType.TRUCK) {
        newServices = prev.filter((s) => s.type !== ServiceType.TRUCK);
      }

      newServices.push(service);

      if (service.isQuantity) {
        setQuantities((prev) => ({
          ...prev,
          [service.id]: 1,
        }));
      }

      return newServices;
    });
  };

  const renderQuantityControls = (service: IService) => {
    if (!service.isQuantity) return null;

    return (
      <div className="flex items-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={(e) => handleDecrease(e, service.id.toString())}
          className="px-2 py-1 border-orange-500 text-orange-500 hover:bg-orange-50"
        >
          -
        </Button>
        <span className="w-12 text-center flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm">
          {quantities[service.id] || 0}
        </span>
        <Button
          variant="outline"
          onClick={(e) => handleIncrease(e, service.id.toString())}
          className="px-2 py-1 border-orange-500 text-orange-500 hover:bg-orange-50"
        >
          +
        </Button>
      </div>
    );
  };

  const renderChildServices = (parentService: IService) => {
    if (!parentService.inverseParentService?.length) return null;

    return (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: "auto",
          opacity: 1,
          transition: {
            height: { duration: 0.3 },
            opacity: { duration: 0.3, delay: 0.1 },
          },
        }}
        exit={{
          height: 0,
          opacity: 0,
          transition: {
            height: { duration: 0.3 },
            opacity: { duration: 0.2 },
          },
        }}
        className="ml-8 mt-4 space-y-4 pr-4 max-h-[250px] overflow-y-auto"
      >
        {parentService.inverseParentService.map((childService, index) => {
          const isSelected = selectedServices.some(
            (s) => s.id === childService.id
          );
          const ServiceIcon =
            ServiceTypeIcons[childService.type as ServiceType];

          return (
            <motion.div
              key={childService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={`border transition-all duration-200 hover:border-orange-300 ${
                  isSelected ? "border-orange-500" : "border-gray-200"
                }`}
              >
                <CardContent className="p-4">
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => handleServiceSelect(childService, true)}
                  >
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {ServiceIcon && <ServiceIcon className="h-4 w-4" />}
                        {childService.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {childService.description}
                      </p>
                 
                        <p className="text-sm font-medium mt-1 text-orange-600">
                          Giá: {formatter.format(childService.amount)}
                        </p>
                    </div>
                    {isSelected && renderQuantityControls(childService)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  const renderMainService = (service: IService) => {
    const hasChildServices = service.inverseParentService?.length > 0;
    const isExpanded = expandedServices[service.id];
    const isSelected = selectedServices.some((s) => s.id === service.id);
    const hasSelectedChild = service.inverseParentService?.some((child) =>
      selectedServices.some((s) => s.id === child.id)
    );

    const ServiceIcon = ServiceTypeIcons[service.type as ServiceType];

    return (
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: "easeOut",
          },
        }}
        exit={{
          opacity: 0,
          y: -20,
          transition: {
            duration: 0.3,
          },
        }}
        layout
      >
        <Card
          className={`mb-4 transition-all duration-300 ${
            hasChildServices ? "cursor-pointer" : ""
          } ${
            isSelected || hasSelectedChild
              ? "border-orange-500"
              : "border-gray-300 hover:border-orange-300"
          }`}
        >
          <CardHeader className="p-4">
            <div className="flex items-start justify-between">
              <div
                className={`flex-1 ${
                  !hasChildServices ? "cursor-pointer" : ""
                }`}
                onClick={() =>
                  !hasChildServices && handleServiceSelect(service)
                }
              >
                <CardTitle className="text-lg flex items-center gap-2">
                  {ServiceIcon && <ServiceIcon className="h-4 w-4" />}
                  {service.name}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {service.description}
                </p>
                <p className="font-medium mt-1 text-orange-600">
                  {hasChildServices
                    ? ""
                    : `  Giá: ${formatter.format(service.amount)}`}
                </p>
              </div>
              {hasChildServices && (
                <Button
                  variant="ghost"
                  onClick={() => toggleExpand(service.id.toString())}
                  className="p-2 hover:bg-orange-100"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
            {!hasChildServices && isSelected && renderQuantityControls(service)}
          </CardHeader>
          <CardContent>
            <AnimatePresence>
              {hasChildServices && isExpanded && renderChildServices(service)}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderServicesByType = (serviceType: ServiceType) => {
    if (!services?.data) return null;

    const filteredServices = services.data.filter(
      (service) => !service.parentServiceId && service.type === serviceType
    );

    return filteredServices.map(renderMainService);
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold ">
            Thêm dịch vụ
          </DialogTitle>
          <DialogDescription className="">
            Chọn dịch vụ con bạn muốn thêm vào đây
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Tabs
            defaultValue={ServiceType.SYSTEM}
            onValueChange={(value) => setActiveTab(value as ServiceType)}
          >
            <TabsList className="grid w-full grid-cols-4">
              {Object.values(ServiceType).map((serviceType) => (
                <TabsTrigger
                  key={serviceType}
                  value={serviceType}
                  className="flex items-center gap-2"
                >
                  {typeIcons[serviceType]}
                  {typeLabels[serviceType]}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="h-[60vh] overflow-hidden">
              <ScrollArea className="h-full">
                {Object.values(ServiceType).map((serviceType) => (
                  <TabsContent
                    key={serviceType}
                    value={serviceType}
                    className="m-0 p-4"
                  >
                    {isLoading ? (
                      <p className="text-center">Đang tải...</p>
                    ) : (
                      <>{renderServicesByType(serviceType)}</>
                    )}
                  </TabsContent>
                ))}
              </ScrollArea>
            </div>
          </Tabs>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            Hủy
          </Button>
          <Button
            disabled={isPending || selectedServices.length === 0}
            className="bg-orange-500 text-white hover:bg-orange-600"
            onClick={handleSubmit}
          >
            Thêm dịch vụ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
