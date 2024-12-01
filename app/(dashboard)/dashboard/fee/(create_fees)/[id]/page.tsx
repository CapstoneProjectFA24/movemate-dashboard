import React from "react";
import { getHouses } from "@/features/services/action/houses";
import { getServices } from "@/features/services/action/services";
import { SearchParams } from "@/types/table";
import { getFeeById } from "@/features/fee/actions/fees";
import FeeDetailUpdateForm from "@/features/fee/components/fee-form/update-fee-form";
export interface IndexPageProps {
  searchParams: SearchParams;
  params: {
    id: string;
  };
}
const FeeDetailPage = async ({ params, searchParams }: IndexPageProps) => {
  const [servicesResponse, feeResponse, housesResponse] = await Promise.all([
    getServices(searchParams),
    getFeeById(params.id),
    getHouses(),
  ]);

  return (
    <div>
      <FeeDetailUpdateForm
        services={servicesResponse.data}
        fee={feeResponse.data}
        house={housesResponse.data}
      />
    </div>
  );
};

export default FeeDetailPage;
