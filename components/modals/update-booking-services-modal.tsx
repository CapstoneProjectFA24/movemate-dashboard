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
import { formatter } from "@/lib/utils";
import ServicesCardUpdateSkeleton from "../../features/bookings/components/skeleton/services-card-update-skeleton";

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
      quantity: service.isQuantity ? quantities[service.id] || 0 : 1,
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
      onClose();
      toast.success("Cập nhật dịch vụ thành công !");
    });
  };

  useEffect(() => {
    if (!isOpenModal) {
      setSelectedServices([]);
      setQuantities({});
      setParentService(null);
    }
  }, [isOpenModal]);

  useEffect(() => {
    if (services?.data && isOpenModal) {
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
        if (selectedServiceFromBooking.isQuantity) {
          setQuantities({
            [selectedServiceFromBooking.id]: data.bookingDetail?.quantity || 0,
          });
        }
        setParentService(null);
      } else if (childService) {
        setSelectedServices([childService]);
        if (childService.isQuantity) {
          setQuantities({
            [childService.id]: data.bookingDetail?.quantity || 0,
          });
        }
        setParentService(parentWithChild!);
      }
    }
  }, [services, data.bookingDetail, isOpenModal]);

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
            <p className="font-medium">
              Giá: {formatter.format(child.truckCategory?.price ?? 0)}
            </p>
            {isSelected && child.isQuantity && (
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={(e) => handleDecrease(e, child.id.toString())}
                  className="w-9 h-9 rounded-full border-2 border-orange-500 text-orange-500 "
                >
                  -
                </Button>
                <span className="w-12 text-center flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <div className="flex items-center justify-center">
                    {quantities[child.id] || 0}
                  </div>
                </span>
                <Button
                  variant="outline"
                  onClick={(e) => handleIncrease(e, child.id.toString())}
                  className="w-9 h-9 rounded-full border-2 border-orange-500 text-orange-500 "
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

  const renderServices = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <ServicesCardUpdateSkeleton key={index} />
          ))}
        </div>
      );
    }
    if (!services?.data) {
      return <p className="p-4">Không tìm thấy dịch vụ.</p>;
    }

    return services.data.map((service) => {
      const isSelected = selectedServices.some((s) => s.id === service.id);
      const isInBookingDetails = data.bookingDetails
        ? data.bookingDetails.some((detail) => detail.serviceId === service.id)
        : false;

      return (
        <Card
          key={service.id}
          className={`mb-4 cursor-pointer relative ${
            isSelected ? "border-orange-500" : "border-gray-300"
          }`}
          onClick={() => handleServiceSelect(service)}
        >
          {isInBookingDetails && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />
          )}
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{service.description}</p>
            <p className="font-medium">
              Giá: {formatter.format(service.amount)}
            </p>
            {isSelected && service.isQuantity && (
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={(e) => handleDecrease(e, service.id.toString())}
                  className="w-9 h-9 rounded-full border-2 border-orange-500 text-orange-500 "
                >
                  -
                </Button>
                <span className="w-12 text-center flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <div className="flex items-center justify-center">
                    {quantities[service.id] || 0}
                  </div>
                </span>
                <Button
                  variant="outline"
                  onClick={(e) => handleIncrease(e, service.id.toString())}
                  className="w-9 h-9 rounded-full border-2 border-orange-500 text-orange-500 "
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
          ) : (
            <div>{renderServices()}</div>
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
