import React, { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const UpdateBookingServicesModalSheet = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "updateBookingServicesModalSheet";
  const { data: services, isLoading } = useGetServicesToUpdateBooking(
    data.bookingDetail?.type as ServiceType
  );

  const bookingDetails = data.bookingDetails;

  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [parentService, setParentService] = useState<IService | null>(null);

  const prepareBookingDetails = () => {
    return selectedServices.map((service) => ({
      serviceId: service.id,
      quantity: quantities[service.id] || 0,
    }));
  };

  const handleSubmit = () => {
    const bookingDetails = prepareBookingDetails();
    const dataToSend = { bookingDetails };
    console.log(dataToSend);
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
        setSelectedServices((prev) => [...prev, selectedServiceFromBooking]);
        setQuantities((prev) => ({
          ...prev,
          [selectedServiceFromBooking.id]: data.bookingDetail?.quantity || 0,
        }));
        setParentService(null);
      } else if (childService) {
        setSelectedServices([childService]);
        setQuantities((prev) => ({
          ...prev,
          [childService.id]: data.bookingDetail?.quantity || 0,
        }));
        setParentService(parentWithChild!);
      }
    }
  }, [services, data.bookingDetail]);

  const handleIncrease = (event: React.MouseEvent, serviceId: string) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
    setQuantities((prev) => ({
      ...prev,
      [serviceId]: (prev[serviceId] || 0) + 1,
    }));
  };

  const handleDecrease = (event: React.MouseEvent, serviceId: string) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
    if (quantities[serviceId] > 0) {
      setQuantities((prev) => ({
        ...prev,
        [serviceId]: prev[serviceId] - 1,
      }));
    }
  };

  const handleServiceSelect = (service: IService) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.id === service.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const renderChildServices = () => {
    if (!parentService || !parentService.inverseParentService) return null;

    return parentService.inverseParentService.map((child) => {
      const isSelected = selectedServices.some((s) => s.id === child.id);
      const isInBookingDetails = bookingDetails!.some(
        (detail) => detail.serviceId === child.id
      );

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
                <Input
                  type="number"
                  value={quantities[child.id] || 0}
                  onChange={(e) =>
                    setQuantities((prev) => ({
                      ...prev,
                      [child.id]: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-16 text-center"
                />
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

  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <Sheet open={isOpenModal} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cập nhật dịch vụ</SheetTitle>
          <SheetDescription>Chỉnh sửa dịch vụ đã đặt.</SheetDescription>
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
                    {service.isQuantity && (
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
                        <Input
                          type="number"
                          value={quantities[service.id] || 0}
                          onChange={(e) =>
                            setQuantities((prev) => ({
                              ...prev,
                              [service.id]: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="w-16 text-center"
                        />
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
                    )}
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
