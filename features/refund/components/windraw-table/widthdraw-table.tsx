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
import { fetchWidthdrawTableColumnDefs } from "./widthdraw-table-column-def";
import { IRefund } from "../../types/refund-type";
import { getRefunds } from "../../actions/refund";
import {
  RefundTypeName,
  StatusTrackerTypeName,
} from "../../enums/refund-enums";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { IWindraw } from "../../types/windraw-type";

interface WidthdrawTableProps {
  widthDrawData: ApiListResponse<IWindraw>;
}

export function WidthdrawTable({ widthDrawData }: WidthdrawTableProps) {
  const { data, pageCount } = widthDrawData;

  const columns = React.useMemo<ColumnDef<IWindraw, unknown>[]>(
    () => fetchWidthdrawTableColumnDefs(),
    []
  );

  const labels = generateColumnLabels(columns);

  const searchableColumns: DataTableSearchableColumn<IWindraw>[] = [
    // {
    //   id: "owner",
    //   title: "Tìm kiếm",
    // },
  ];

  const filterableColumns: DataTableFilterableColumn<IWindraw>[] = [
    // {
    //   id: "type",
    //   title: "Loại yêu cầu",
    //   options: Object.entries(RefundTypeName).map(([value, label]) => ({
    //     label,
    //     value,
    //   })),
    // },
    // {
    //   id: "status",
    //   title: "Trạng thái",
    //   options: Object.entries(StatusTrackerTypeName).map(([value, label]) => ({
    //     label,
    //     value,
    //   })),
    // },
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
          <h2 className="text-lg font-medium">Yêu Cầu Rút Tiền</h2>
        </div>
      </div>

      <Card className="flex-1">
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
