
import { getServiceById } from "@/features/services/action/services";
import { getTruckCategorys } from "@/features/services/action/truck-category";
import ServiceDetailUpdateForm from "@/features/services/components/services-form/service-detail-update-form";
import React from "react";

const ServiceDetailPage = async ({ params }: { params: { id: string } }) => {
  const [service, truckCategorys] = await Promise.all([
    getServiceById(params.id),
    getTruckCategorys(),
  ]);

  return (
    <div>
      <ServiceDetailUpdateForm
        service={service.data}
        truckCategorys={truckCategorys.data}
      />
    </div>
  );
};

export default ServiceDetailPage;
