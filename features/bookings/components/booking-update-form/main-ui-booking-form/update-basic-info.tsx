"use client";
import React, { useTransition } from "react";
import { Control, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Building2, Save } from "lucide-react";
import FormFieldCustom from "@/components/form/form-field";
import SelectFormField from "@/components/form/select-form-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IHouse } from "@/features/services/types/house-type";
import { useParams } from "next/navigation";
import { updateBookingStatus } from "@/features/bookings/action/update-booking";
import { toast } from "sonner";

interface UpdateBasicInfoProps {
  control: Control<any>;
  houseTypes: IHouse[] | null;
  loading: boolean;
  canReview: boolean;
}

const UpdateBasicInfo = ({
  control,
  houseTypes,
  loading,
  canReview,
}: UpdateBasicInfoProps) => {
  const { getValues } = useFormContext();
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const handleUpdateClick = () => {
    const data = {
      houseTypeId: getValues("houseTypeId"),
      roomNumber: getValues("roomNumber"),
      floorsNumber: getValues("floorsNumber"),
      pickupAddress: getValues("pickupAddress"),
      deliveryAddress: getValues("deliveryAddress"),
    };

    startTransition(async () => {
      const result = await updateBookingStatus(params.id.toString(), data);

      if (!result.success) {
        toast.error(result.error);
      }
      toast.success("Cập nhật dịch vụ thành công !");
    });
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b ">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg font-semibold">
            <Building2 className="h-5 w-5 mr-2 text-primary" />
            Thông tin địa điểm
          </CardTitle>
          {canReview && (
            <Button
              disabled={loading}
              type="button"
              onClick={handleUpdateClick}
              className="bg-primary hover:bg-primary/90 text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SelectFormField
            control={control}
            name="houseTypeId"
            label="Loại nhà"
            placeholder="Chọn loại nhà"
            options={houseTypes}
            renderOption={(option) => option.name}
            loading={loading}
            canReview={canReview}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FormFieldCustom
            control={control}
            name="roomNumber"
            label="Số phòng"
            placeholder="Nhập số phòng"
            type="number"
            min={1}
            disabled={loading || !canReview}
            className="w-full"
          />
          <FormFieldCustom
            control={control}
            name="floorsNumber"
            label="Số tầng"
            placeholder="Nhập số tầng"
            type="number"
            min={1}
            disabled={loading || !canReview}
            className="w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <FormFieldCustom
            control={control}
            name="pickupAddress"
            label="Địa chỉ cho nhân viên tới để dọn nhà"
            placeholder="Nhập địa chỉ nhận đồ"
            disabled={loading || !canReview}
            className="w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <FormFieldCustom
            control={control}
            name="deliveryAddress"
            label="Địa chỉ vận chuyển đi"
            placeholder="Nhập địa chỉ giao đồ"
            disabled={loading || !canReview}
            className="w-full"
          />
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default UpdateBasicInfo;
