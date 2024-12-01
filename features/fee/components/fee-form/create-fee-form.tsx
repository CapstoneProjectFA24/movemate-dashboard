"use client";

import { IHouse } from "@/features/services/types/house-type";
import { IService } from "@/features/services/types/services-type";
import React from "react";

interface CreateFeeFormProps {
  services: IService[];
  house: IHouse[];
}

const CreateFeeForm = ({ services, house }: CreateFeeFormProps) => {
  console.log(services);
  console.log(house);
  return <div>CreateFeeForm</div>;
};

export default CreateFeeForm;
