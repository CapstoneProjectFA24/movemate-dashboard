import { getPromotionById } from "@/features/promotions/actions/promotions";
import PromotionForm from "@/features/promotions/components/promotion-form/promotion-form";
import React from "react";

const PromotionsDetailPage = async ({
  params,
}: {
  params: { promotionId: string };
}) => {
  const [promotion] = await Promise.all([
    getPromotionById(params.promotionId.toString()),
  ]);
  return (
    <div>
      <PromotionForm initialData={promotion?.data}/>
    </div>
  );
};

export default PromotionsDetailPage;
