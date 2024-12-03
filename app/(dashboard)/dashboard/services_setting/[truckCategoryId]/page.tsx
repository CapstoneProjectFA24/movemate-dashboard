import TruckCategoryForm from "@/features/services-settings/components/truck-category-form/truck-category-form";
import { getTruckCategoryById } from "@/features/services/action/truck-category";
import React from "react";

const TruckCategoryDetailPage = async ({
  params,
}: {
  params: { truckCategoryId: string };
}) => {
  const [truckCategory] = await Promise.all([
    getTruckCategoryById(params.truckCategoryId.toString()),
  ]);
  return (
    <div>
      <TruckCategoryForm initialData={truckCategory?.data} />
    </div>
  );
};

export default TruckCategoryDetailPage;
