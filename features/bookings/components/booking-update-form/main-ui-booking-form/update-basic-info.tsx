import FormFieldCustom from "@/components/form/form-field";
import SelectFormField from "@/components/form/select-form-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IHouse } from "@/features/services/type/house-type";
import { Building2 } from "lucide-react";
import React from "react";
import { Control } from "react-hook-form";
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
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="h-5 w-5 mr-2 text-primary" />
            Thông tin địa điểm
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
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

          <div className="grid grid-cols-2 gap-4">
            <FormFieldCustom
              control={control}
              name="roomNumber"
              label="Số phòng"
              placeholder="Nhập số phòng"
              type="number"
              disabled={loading || !canReview}
            />
            <FormFieldCustom
              control={control}
              name="floorsNumber"
              label="Số tầng"
              placeholder="Nhập số tầng"
              type="number"
              disabled={loading || !canReview}
            />
          </div>
          <FormFieldCustom
            control={control}
            name="pickupAddress"
            label="  Địa chỉ cho nhân viên tới để dọn nhà"
            placeholder="Nhập địa chỉ nhận đồ"
            disabled={loading || !canReview}
          />
          <FormFieldCustom
            control={control}
            name="deliveryAddress"
            label="Địa chỉ vận chuyển đi"
            placeholder="Nhập địa chỉ giao đồ"
            disabled={loading || !canReview}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default UpdateBasicInfo;
