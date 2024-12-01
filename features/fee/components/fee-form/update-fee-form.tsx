import { IService } from "@/features/services/types/services-type";
import React from "react";
import { IFee } from "../../types/fee-type";
import { IHouse } from "@/features/services/types/house-type";

interface FeeDetailUpdateFormProps {
  services: IService[] | null;
  fee: IFee | null;
  house: IHouse[] | null;
}
const FeeDetailUpdateForm = ({
  services,
  fee,
  house,
}: FeeDetailUpdateFormProps) => {
  // {
  //     id: 78,
  //     serviceId: 3,
  //     houseTypeId: 4,
  //     name: 'test',
  //     description: 'test',
  //     amount: 1,
  //     isActived: true,
  //     type: 'PORTER',
  //     unit: null,
  //     floorPercentage: 12
  //   }
  return <div>FeeDetailUpdateForm</div>;
};

export default FeeDetailUpdateForm;
