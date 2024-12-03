"use client";
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
import { Home, Pencil, Plus, PlusCircle, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateHouses } from "@/features/services/action/houses";
import { toast } from "sonner";

interface HouseSettingsProps {
  data: ApiListResponse<IHouse>;
}

const HouseSettings = ({ data }: HouseSettingsProps) => {
  const [houses, setHouses] = useState<IHouse[]>(data.data);
  const [editingHouse, setEditingHouse] = useState<IHouse | null>(null);
  const [isPending, startTransition] = useTransition();
  const handleEdit = (house: IHouse) => {
    setEditingHouse(house);
  };

  const handleSave = () => {
    if (editingHouse) {
      startTransition(async () => {
        const result = await updateHouses(
          editingHouse,
          editingHouse.id.toString()
        );

        if (!result.success) {
          toast.error(result.error);
        } else {
          toast.success("Cập nhật loại nhà thành công");
        }
      });
      setHouses(
        houses.map((h) => (h.id === editingHouse.id ? editingHouse : h))
      );
      setEditingHouse(null);
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
      <div className="flex justify-between p-6">
        <div className="text-3xl font-bold tracking-tight">
          Quản lý loại nhà
        </div>
        <Button type="button" variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span className="text-sm"> Tạo mới</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {houses.map((house) => (
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
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default HouseSettings;
