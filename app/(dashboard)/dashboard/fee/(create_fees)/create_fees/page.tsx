import CreateFeeForm from "@/features/fee/components/fee-form/create-fee-form";
import { getHouses } from "@/features/services/action/houses";
import { getServices } from "@/features/services/action/services";
import { SearchParams } from "@/types/table";
import React from "react";
export interface IndexPageProps {
  searchParams: SearchParams;
}
const CreateFeePage = async ({ searchParams }: IndexPageProps) => {
  // const services = await getServices(searchParams);

  const [servicesResponse, housesResponse] = await Promise.all([
    getServices(searchParams),
    getHouses(),
  ]);

  return (
    <div className="flex">
      <div className="flex-1">
        <CreateFeeForm
          services={servicesResponse?.data}
          house={housesResponse?.data}
        />
      </div>
    </div>
  );
};

export default CreateFeePage;
