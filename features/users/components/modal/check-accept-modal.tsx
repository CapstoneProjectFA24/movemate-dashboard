"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { useGetUserById } from "../../react-query/query";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateAccpet } from "../../action/users";

export const AccpetUserModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "accpetUserModal";
  const [isPending, startTransition] = useTransition();
  const { data: userData, isLoading: userIsLoading } = useGetUserById(
    data.user?.id.toString()!
  );

  if (userIsLoading) {
    return <div>...userIsLoading</div>;
  }

  const handleAccept = async () => {
    startTransition(async () => {
      const result = await updateAccpet(userData?.data?.id!.toString()!);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      onClose();
      toast.success("Xác nhận!");
    });
  };

  console.log(`userData ${userData?.data?.id!}`);

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold ">
            Xét duyệt cho tài xế
          </DialogTitle>
          {/* <DialogDescription>{renderStaffStats(activeTab)}</DialogDescription> */}

          <Button
            className="flex bg-green-600"
            type="button"
            onClick={() => handleAccept()}
          >
            Chấp thuận
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
