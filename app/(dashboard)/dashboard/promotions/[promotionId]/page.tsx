import { getPromotionById } from "@/features/promotions/actions/promotions";
import PromotionForm from "@/features/promotions/components/promotion-form/promotion-form";
import { getServices } from "@/features/services/action/services";
import { SearchParams } from "@/types/table";
import React from "react";
export interface IndexPageProps {
  searchParams: SearchParams;
  params: {
    promotionId: string;
  };
}
const PromotionsDetailPage = async ({ params, searchParams }: IndexPageProps) => {
  const [promotion, services] = await Promise.all([
    getPromotionById(params.promotionId.toString()),
    getServices(searchParams),
  ]);
  return (
    <div>
      <PromotionForm initialData={promotion?.data} services={services.data}/>
    </div>
  );
};

export default PromotionsDetailPage;
