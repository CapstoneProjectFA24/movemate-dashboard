"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";
import { toast } from "sonner";

import { ServiceTypeNames } from "@/features/services/enums/service-enum";
import { generateColumnLabels } from "@/components/data-table/column-label-mapping";
import { IPromotion } from "../../types/promotion-type";
import { getPromotionsSearchParams } from "../../actions/promotions";
import { fetchPromotionsTableColumnDefs } from "./promotion-table-column-def";

interface PromotionsTableProps {
  promotionsPromise: ReturnType<typeof getPromotionsSearchParams>;
}

export function PromotionsTable({ promotionsPromise }: PromotionsTableProps) {
  const { data, pageCount } = React.use(promotionsPromise);

  const columns = React.useMemo<ColumnDef<IPromotion, unknown>[]>(
    () => fetchPromotionsTableColumnDefs(),
    []
  );
  const labels = generateColumnLabels(columns);

  const searchableColumns: DataTableSearchableColumn<IPromotion>[] = [
    // {
    //   id: "name",
    //   title: "dịch vụ",
    // },
  ];

  const filterableColumns: DataTableFilterableColumn<IPromotion>[] = [
    // {
    //   id: "type",
    //   title: "Loại dịch vụ",
    //   options: Object.entries(ServiceTypeNames).map(([value, label]) => ({
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
      <DataTable
        dataTable={dataTable}
        columns={columns}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
        newRowLink="/dashboard/promotions/create_promotion"
        columnLabels={labels}
      />
    </div>
  );
}
