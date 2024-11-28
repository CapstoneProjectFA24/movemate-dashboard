"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ImageUploadOne } from "@/components/image-cloudinary-upload/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/image-uploadthing/file-upload";
import { toast } from "sonner";
import { createServices } from "../../action/create-service";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const UpdateServicesModal = () => {
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "updateServicesModal";

  return (
    <Sheet open={isOpenModal} onOpenChange={onClose} >
      <SheetContent side="right" >
        <SheetHeader>
          <SheetTitle>Cập nhật dịch vụ</SheetTitle>
          <SheetDescription>Chỉnh sửa dịch vụ .</SheetDescription>
        </SheetHeader>
        <div>CONTENT</div>
      </SheetContent>
    </Sheet>
  );
};
