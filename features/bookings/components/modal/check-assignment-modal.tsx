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

export const CheckAssignmentModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "checkAssignmentModal";

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold ">
            Kiểm tra nhân viên khả dụng
          </DialogTitle>
        </DialogHeader>

        <div>CONTENT</div>
      </DialogContent>
    </Dialog>
  );
};
