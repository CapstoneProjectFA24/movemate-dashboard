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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetCheckAvailableDriver,
  useGetCheckAvailablePorter,
} from "@/features/bookings/react-query/query";

import { Package2, Truck } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ExceptionModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "exceptionModal";

  const assignment = data.assignment;


  const { data: driverData, isLoading: driverDataIsLoading } =
    useGetCheckAvailableDriver(assignment?.bookingId?.toString()!);
  const { data: porterData, isLoading: porterDataIsLoading } =
    useGetCheckAvailablePorter(assignment?.bookingId?.toString()!);
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold ">
            Kiểm tra nhân viên khả dụng
          </DialogTitle>
          {/* <DialogDescription>{renderStaffStats(activeTab)}</DialogDescription> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
