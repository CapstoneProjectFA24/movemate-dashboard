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
import {
  useGetCheckAvailableDriver,
  useGetCheckAvailablePorter,
  useGetServicesToUpdateBooking,
} from "@/features/bookings/react-query/query";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import StaffInfoModal from "../booking-update-form/main-ui-booking-form/staff-info-modal";

export enum AvailableStaffType {
  DRIVER = "DRIVER",
  PORTER = "PORTER",
}
const typeLabels = {
  [AvailableStaffType.PORTER]: "Nhân viên khuân vác",
  [AvailableStaffType.DRIVER]: "Nhân viên lái xe",
};

const typeIcons = {
  [AvailableStaffType.PORTER]: <Package2 className="w-4 h-4" />,
  [AvailableStaffType.DRIVER]: <Truck className="w-4 h-4" />,
};
export const CheckAssignmentModal = () => {
  const params = useParams();
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "checkAssignmentModal";
  const [activeTab, setActiveTab] = useState<AvailableStaffType>(
    AvailableStaffType.DRIVER
  );
  const [selectedOption, setSelectedOption] = useState<
    "assignmentInBooking" | "staffInSlot" | "otherStaffs"
  >("assignmentInBooking");

  const { data: driverData, isLoading: driverDataIsLoading } =
    useGetCheckAvailableDriver(params.id.toString());
  const { data: porterData, isLoading: porterDataIsLoading } =
    useGetCheckAvailablePorter(params.id.toString());

  function renderStaffStats(staffType: AvailableStaffType) {
    const data =
      staffType === AvailableStaffType.DRIVER
        ? driverData?.data
        : porterData?.data;

    if (!data) return null;

    return (
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm text-muted-foreground">Loại nhân viên</div>
            <div className="text-sm font-bold">
              {typeLabels[data.staffType as AvailableStaffType]}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm text-muted-foreground">
              Nhân viên cần thiết
            </div>
            <div className="text-2xl font-bold">{data.bookingNeedStaffs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm text-muted-foreground">
              Nhân viên trong slot
            </div>
            <div className="text-2xl font-bold">{data.countStaffInslots}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm text-muted-foreground">
              Nhân viên khác slot
            </div>
            <div className="text-2xl font-bold">{data.countOtherStaff}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderStaffInfo(staffType: AvailableStaffType) {
    if (staffType === AvailableStaffType.DRIVER) {
      if (driverDataIsLoading)
        return <p className="text-center">Đang tải...</p>;
      if (!driverData?.data?.isSuccessed) {
        return (
          <div className="p-4">
            <p>Không có thông tin nhân viên lái xe khả dụng.</p>
          </div>
        );
      }

      return (
        <div>
          <Select
            value={selectedOption}
            onValueChange={(value) =>
              setSelectedOption(
                value as "assignmentInBooking" | "staffInSlot" | "otherStaffs"
              )
            }
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Chọn thông tin nhân viên" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="assignmentInBooking">
                Nhân viên được giao
              </SelectItem>
              <SelectItem value="staffInSlot">Nhân viên trong slot</SelectItem>
              <SelectItem value="otherStaffs">Những nhân viên khác</SelectItem>
            </SelectContent>
          </Select>

          {selectedOption === "assignmentInBooking" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {driverData.data.assignmentInBooking!.map((staff) => (
                <Card key={staff.id}>
                  <CardHeader>
                    <CardTitle>{staff.id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Trạng thái: {staff.status}</p>
                    <p>Đơn hàng: {staff.bookingId}</p>
                    <p>Vai trò: {staff.staffType}</p>
                    <p>Có phép: {staff.isResponsible ? "Có" : "Không"}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedOption === "otherStaffs" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {driverData.data.otherStaffs!.map((staff) => (
                <StaffInfoModal key={staff.id} staff={staff} />
              ))}
            </div>
          )}

          {selectedOption === "staffInSlot" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {driverData.data.staffInSlot!.map((staff) => (
                <StaffInfoModal key={staff.id} staff={staff} />
              ))}
            </div>
          )}
        </div>
      );
    } else {
      if (porterDataIsLoading)
        return <p className="text-center">Đang tải...</p>;
      if (!porterData?.data?.isSuccessed) {
        return (
          <div className="p-4">
            <p>Không có thông tin nhân viên khuân vác khả dụng.</p>
          </div>
        );
      }

      return (
        <div>
          <Select
            value={selectedOption}
            onValueChange={(value) =>
              setSelectedOption(
                value as "assignmentInBooking" | "otherStaffs" | "staffInSlot"
              )
            }
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Chọn thông tin nhân viên" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="assignmentInBooking">
                Nhân viên được giao
              </SelectItem>
              <SelectItem value="staffInSlot">Nhân viên trong slot</SelectItem>
              <SelectItem value="otherStaffs">Những nhân viên khác</SelectItem>
            </SelectContent>
          </Select>

          {selectedOption === "assignmentInBooking" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {porterData.data.assignmentInBooking!.map((staff) => (
                <Card key={staff.id}>
                  <CardHeader>
                    <CardTitle>{staff.id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Trạng thái: {staff.status}</p>
                    <p>Đơn hàng: {staff.bookingId}</p>
                    <p>Vai trò: {staff.staffType}</p>
                    <p>Có phép: {staff.isResponsible ? "Có" : "Không"}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedOption === "otherStaffs" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {porterData.data.otherStaffs!.map((staff) => (
                <StaffInfoModal key={staff.id} staff={staff} />
              ))}
            </div>
          )}

          {selectedOption === "staffInSlot" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {porterData.data.staffInSlot!.map((staff) => (
                <StaffInfoModal key={staff.id} staff={staff} />
              ))}
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold ">
            Kiểm tra nhân viên khả dụng
          </DialogTitle>
          <DialogDescription>{renderStaffStats(activeTab)}</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Tabs
            defaultValue={AvailableStaffType.DRIVER}
            onValueChange={(value) => setActiveTab(value as AvailableStaffType)}
          >
            <TabsList className="grid w-full grid-cols-2">
              {Object.values(AvailableStaffType).map((staffType) => (
                <TabsTrigger
                  key={staffType}
                  value={staffType}
                  className="flex items-center gap-2"
                >
                  {typeIcons[staffType]}
                  {typeLabels[staffType]}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="h-[60vh] overflow-hidden">
              <ScrollArea className="h-full">
                {Object.values(AvailableStaffType).map((staffType) => (
                  <TabsContent
                    key={staffType}
                    value={staffType}
                    className="m-0 p-4"
                  >
                    {/* {isLoading ? (
                      <p className="text-center">Đang tải...</p>
                    ) : (
                      <>{renderServicesByType(serviceType)}</>
                    )} */}
                    {renderStaffInfo(staffType)}
                  </TabsContent>
                ))}
              </ScrollArea>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
