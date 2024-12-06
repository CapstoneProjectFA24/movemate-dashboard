"use client";

import React from "react";

import { ColumnDef } from "@tanstack/react-table";

import { generateColumnLabels } from "@/components/data-table/column-label-mapping";
import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";
import { useDataTable } from "@/hooks/use-data-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { Clock, PlusCircle } from "lucide-react";
import { fetchRefundTableColumnDefs } from "./refund-table-column-def";
import { IRefund } from "../../types/refund-type";
import { getRefunds } from "../../actions/refund";
import { RefundTypeName, StatusTrackerTypeName } from "../../enums/refund-enums";

interface RefundTableProps {
  refundPromise: ReturnType<typeof getRefunds>;
}

export function RefundTable({ refundPromise }: RefundTableProps) {
  const { data, pageCount } = React.use(refundPromise);

  const columns = React.useMemo<ColumnDef<IRefund, unknown>[]>(
    () => fetchRefundTableColumnDefs(),
    []
  );

  const labels = generateColumnLabels(columns);

  const searchableColumns: DataTableSearchableColumn<IRefund>[] = [
    {
      id: "owner",
      title: "Tìm kiếm",
    },
  ];

  const filterableColumns: DataTableFilterableColumn<IRefund>[] = [
    {
      id: "type",
      title: "Loại yêu cầu",
      options: Object.entries(RefundTypeName).map(([value, label]) => ({
        label,
        value,
      })),
    },
    {
      id: "status",
      title: "Trạng thái",
      options: Object.entries(StatusTrackerTypeName).map(([value, label]) => ({
        label,
        value,
      })),
    },
  ];

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium">Yêu Cầu Hoàn Tiền</h2>
          <p className="text-gray-500 text-sm">
            Tổng số yêu cầu đang chờ xử lý: {data.length}
          </p>
        </div>
      </div>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Danh Sách Yêu Cầu</CardTitle>
          <CardDescription>
            Các yêu cầu hoàn tiền đang chờ xử lý
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            dataTable={dataTable}
            columns={columns}
            searchableColumns={searchableColumns}
            filterableColumns={filterableColumns}
            columnLabels={labels}
          />
        </CardContent>
      </Card>
    </div>
  );
}
