import { getTruckCategorys } from "@/features/services/action/truck-category";
// import CreateServiceForm from "@/features/services/test/create-service-form-v2";
// import CreateServiceForm from "@/features/services/components/services-form/create-service-form-v1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CreateServiceForm from "@/features/services/components/services-form/create-service-form";
const CreateService = async () => {
  const truckCategorys = await getTruckCategorys();

  return (
    // <div className="flex">
    //   <div className="flex-1">
    //     {/* <CreateServiceForm truckCategorys={truckCategorys.data} /> */}
    //     {/* <CreateServiceForm /> */}
    //     <Tabs defaultValue="basic" orientation="vertical" className="h-full">
    //       <TabsList >
    //         <TabsTrigger value="basic">Thông tin dịch vụ</TabsTrigger>
    //         <TabsTrigger value="child-services">Dịch vụ con</TabsTrigger>
    //       </TabsList>
    //     </Tabs>
    //   </div>
    // </div>
    <div className="flex">
      <div className="flex-1">
        {/* <Tabs defaultValue="basic" className="flex"> */}
        {/* <TabsList className="flex flex-col h-full space-x-0 space-y-2 bg-muted/50  rounded-lg mr-4 text-start">
            <TabsTrigger value="basic">Dịch vụ mới</TabsTrigger>
            <TabsTrigger value="child-services">Dịch vụ con</TabsTrigger>
          </TabsList> */}

        {/* <TabsContent value="basic" className="flex-1"> */}
        {/* Content for basic tab */}
        <CreateServiceForm truckCategorys={truckCategorys.data} />
        {/* </TabsContent> */}

        {/* <TabsContent value="child-services" className="flex-1"> */}
        {/* Content for child services tab */}
        {/* <div>Nội dung dịch vụ con</div> */}
        {/* </TabsContent> */}
        {/* </Tabs>  */}
      </div>
    </div>
  );
};

export default CreateService;
