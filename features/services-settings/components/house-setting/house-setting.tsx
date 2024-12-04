import React, { useState, useTransition } from "react";
import { IHouse } from "@/features/services/types/house-type";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Pencil, PlusCircle, Save, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { deleteHouse, updateHouses } from "@/features/services/action/houses";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal";
import AlertModal from "@/components/modals/alert-modal";
import { useRouter } from "nextjs-toploader/app";
interface HouseSettingsProps {
  data: ApiListResponse<IHouse>;
}

const HouseSettings = ({ data }: HouseSettingsProps) => {
  const [editingHouse, setEditingHouse] = useState<IHouse | null>(null);
  const { onOpen } = useModal();
  const [houseToDelete, setHouseToDelete] = useState<IHouse | null>(null); // Store house to delete
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleEdit = (house: IHouse) => {
    setEditingHouse(house);
  };

  const handleSave = async () => {
    if (editingHouse) {
      const result = await updateHouses(
        editingHouse,
        editingHouse.id.toString()
      );

      if (!result.success) {
        toast.error(result.error);
      } else {
        toast.success("Cập nhật loại nhà thành công");
        setEditingHouse(null);
      }
    }
  };

  const onDelete = async () => {
    if (houseToDelete) {
      try {
        setLoading(true);
        startTransition(async () => {
          const result = await deleteHouse(houseToDelete.id.toString());

          if (!result.success) {
            toast.error(result.error);
          } else {
            toast.success("Xóa thành công.");
            router.push("/dashboard/services_setting");
          }
        });
      } catch (error: any) {
        toast.error("Đã có lỗi.");
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editingHouse) {
      setEditingHouse({
        ...editingHouse,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        variant="danger"
        onConfirm={onDelete}
        loading={loading}
        title="Xóa loại phí"
        description="Bạn có chắc chắn muốn xóa loại nhà này không?"
      />
      <div>
        <div className="flex justify-between p-6">
          <div className="text-3xl font-bold tracking-tight">
            Quản lý loại nhà
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => onOpen("createHouseModal", {})}
          >
            <PlusCircle className="h-4 w-4" />
            <span className="text-sm"> Tạo mới</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {data.data
            .sort((a, b) => a.id - b.id)
            .map((house) => (
              <Card
                key={house.id}
                className="group relative bg-white dark:bg-muted/40 shadow-md hover:shadow-xl transition-all duration-300 border-orange-100 dark:border-orange-900"
              >
                <div className="absolute -top-2 -right-2">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"
                  >
                    {house.id}
                  </Badge>
                </div>

                <CardHeader className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    {editingHouse?.id === house.id ? (
                      <Input
                        name="name"
                        value={editingHouse.name}
                        onChange={handleInputChange}
                        className="text-lg font-semibold"
                      />
                    ) : (
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {house.name}
                      </CardTitle>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  {editingHouse?.id === house.id ? (
                    <Textarea
                      name="description"
                      value={editingHouse.description}
                      onChange={handleInputChange}
                      className="text-gray-600 dark:text-gray-300"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                      {house.description}
                    </p>
                  )}
                </CardContent>

                <CardFooter className="p-4 flex justify-end border-t border-orange-100 dark:border-orange-900">
                  {editingHouse?.id === house.id ? (
                    <Button
                      variant="ghost"
                      type="button"
                      size="icon"
                      className="hover:bg-green-600 dark:hover:bg-green-900 text-green-600 dark:text-green-400"
                      onClick={handleSave}
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      type="button"
                      size="icon"
                      className="hover:bg-orange-600 dark:hover:bg-orange-900 text-orange-600 dark:text-orange-400"
                      onClick={() => handleEdit(house)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    type="button"
                    size="icon"
                    onClick={() => {
                      setHouseToDelete(house); // Set house to delete before opening modal
                      setOpen(true);
                    }}
                    className="hover:bg-red-600 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default HouseSettings;
