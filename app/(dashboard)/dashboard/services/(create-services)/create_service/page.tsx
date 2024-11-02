import { getTruckCategorys } from "@/features/services/action/truck-category";
import CreateServiceForm from "@/features/services/components/services-form/create-service-form";
import React from "react";

const CreateService = async () => {
  const truckCategorys = await getTruckCategorys();

  return (
    <div>
      <CreateServiceForm truckCategorys={truckCategorys.data} />
    </div>
  );
};

export default CreateService;
