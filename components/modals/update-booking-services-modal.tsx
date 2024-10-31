"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useModal } from "@/hooks/use-modal";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetServicesToUpdateBooking } from "@/features/bookings/react-query/query";
import { ServiceType } from "@/features/services/enums/service-enum";
import { IService } from "@/features/services/type/services-type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { updateBookingStatus } from "@/features/bookings/action/update-booking";

export const UpdateBookingServicesModalSheet = () => {
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "updateBookingServicesModalSheet";
  const { data: services, isLoading } = useGetServicesToUpdateBooking(
    data.bookingDetail?.type as ServiceType
  );

  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [parentService, setParentService] = useState<IService | null>(null);

  const handleSubmit = async () => {
    const bookingDetails = selectedServices.map((service) => ({
      serviceId: service.id,
      quantity: quantities[service.id] || 0,
    }));

    const truckCategoryId = selectedServices.find(
      (service) => service.truckCategoryId
    )?.truckCategoryId;

    let oldData;
    if (data.bookingDetail?.type === ServiceType.TRUCK) {
      const oldServicesTypeTruck = data.bookingDetail;

      const isServiceChanged = !selectedServices.some(
        (service) => service.id === oldServicesTypeTruck.serviceId
      );

      if (isServiceChanged) {
        oldData = {
          serviceId: oldServicesTypeTruck.serviceId,
          quantity: 0,
        };
      }
    }
    const formatData = oldData ? [...bookingDetails, oldData] : bookingDetails;

    const dataToSend = truckCategoryId
      ? { bookingDetails: formatData, truckCategoryId }
      : { bookingDetails: formatData };

    startTransition(async () => {
      const result = await updateBookingStatus(
        params.id.toString(),
        dataToSend
      );
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Cập nhật dịch vụ thành công !");
    });
  };

  useEffect(() => {
    if (services?.data) {
      const selectedServiceFromBooking = services.data.find(
        (service) => service.id === data.bookingDetail?.serviceId
      );

      const parentWithChild = services.data.find((parentService) =>
        parentService.inverseParentService?.some(
          (child) => child.id === data.bookingDetail?.serviceId
        )
      );

      const childService = parentWithChild?.inverseParentService?.find(
        (child) => child.id === data.bookingDetail?.serviceId
      );

      if (selectedServiceFromBooking) {
        setSelectedServices([selectedServiceFromBooking]);
        setQuantities({
          [selectedServiceFromBooking.id]: data.bookingDetail?.quantity || 0,
        });
        setParentService(null);
      } else if (childService) {
        setSelectedServices([childService]);
        setQuantities({
          [childService.id]: data.bookingDetail?.quantity || 0,
        });
        setParentService(parentWithChild!);
      }
    }
  }, [services, data.bookingDetail]);

  const handleIncrease = (event: React.MouseEvent, serviceId: string) => {
    event.stopPropagation();
    const service = selectedServices.find((s) => s.id.toString() === serviceId);

    if (service && service.isQuantity) {
      const currentQuantity = quantities[serviceId] || 0;
      const maxQuantity =
        parentService?.inverseParentService?.find(
          (child) => child.id.toString() === serviceId
        )?.quantityMax || Infinity;

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

  const handleServiceSelect = (service: IService) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.id === service.id);
      const filteredServices = isSelected
        ? prev.filter((s) => s.id !== service.id)
        : service.type === ServiceType.TRUCK
        ? prev.filter((s) => s.type !== ServiceType.TRUCK).concat(service)
        : [...prev, service];

      if (service.isQuantity && !isSelected) {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [service.id]: 1,
        }));
      }

      return filteredServices;
    });
  };

  const renderChildServices = () => {
    if (!parentService || !parentService.inverseParentService) return null;

    return parentService.inverseParentService.map((child) => {
      const isSelected = selectedServices.some((s) => s.id === child.id);
      const isInBookingDetails = data.bookingDetails 
      ? data.bookingDetails.some((detail) => detail.serviceId === child.id)
      : false;
      
      return (
        <Card
          key={child.id}
          className={`mb-4 cursor-pointer relative ${
            isSelected ? "border-orange-500" : "border-gray-300"
          }`}
          onClick={() => handleServiceSelect(child)}
        >
          {isInBookingDetails && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />
          )}
          <CardHeader>
            <CardTitle>{child.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{child.description}</p>
            <p className="font-medium">Giá: {child.amount} VNĐ</p>
            {isSelected && child.isQuantity && (
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={(e) => handleDecrease(e, child.id.toString())}
                  className="px-2 py-1 border-orange-500 text-orange-500"
                >
                  -
                </Button>
                <span className="w-12 text-center flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  {quantities[child.id] || 0}
                </span>
                <Button
                  variant="outline"
                  onClick={(e) => handleIncrease(e, child.id.toString())}
                  className="px-2 py-1 border-orange-500 text-orange-500"
                >
                  +
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <Sheet open={isOpenModal} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cập nhật dịch vụ</SheetTitle>
          <SheetDescription>
            Chỉnh sửa dịch vụ khách hàng đã đặt.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="max-h-[80vh] p-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {parentService ? (
            <div>{renderChildServices()}</div>
          ) : selectedServices.length > 0 ? (
            selectedServices.map((service) => (
              <div key={service.id}>
                <Card className="mb-4 border border-gray-300">
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                    <p className="font-medium">Giá: {service.amount} VNĐ</p>
                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={(e) =>
                          handleDecrease(e, service.id.toString())
                        }
                        className="px-2 py-1 border-orange-500 text-orange-500"
                      >
                        -
                      </Button>
                      <span className="w-12 text-center flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        {quantities[service.id] || 0}
                      </span>
                      <Button
                        variant="outline"
                        onClick={(e) =>
                          handleIncrease(e, service.id.toString())
                        }
                        className="px-2 py-1 border-orange-500 text-orange-500"
                      >
                        +
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <p className="p-4">Không tìm thấy dịch vụ.</p>
          )}
        </ScrollArea>
        <div className="flex justify-end p-4">
          <Button className="bg-orange-500 text-white" onClick={handleSubmit}>
            Cập nhật dịch vụ
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
