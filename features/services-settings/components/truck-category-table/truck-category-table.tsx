"use client";

import * as React from "react";

import { ApiListResponse } from "@/lib/api/api-handler/generic";

import { ColumnDef } from "@tanstack/react-table";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSearchableColumn } from "@/types/table";
import { generateColumnLabels } from "@/components/data-table/column-label-mapping";
import { ITruckCategory } from "@/features/services/types/services-type";
import { fetchTruckCategoryTableColumnDefs } from "./truck-category-column-def";

interface TruckCategoryTableProps {
  data: ApiListResponse<ITruckCategory>;
}

export function TruckCategoryTable({ data }: TruckCategoryTableProps) {
  const { data: userData, pageCount } = data;

  const columns = React.useMemo<ColumnDef<ITruckCategory, unknown>[]>(
    () => fetchTruckCategoryTableColumnDefs(),
    []
  );
  const searchableColumns: DataTableSearchableColumn<ITruckCategory>[] = [
    // {
    //   id: "categoryName",
    //   title: "Tên",
    // },
  ];
  const labels = generateColumnLabels(columns);
  const { dataTable } = useDataTable({
    data: userData,
    columns,
    pageCount,
    searchableColumns,
    // filterableColumns,
  });
  return (
    <div className="h-full flex flex-col">
      <DataTable
        dataTable={dataTable}
        columns={columns}
        searchableColumns={searchableColumns}
        // filterableColumns={filterableColumns}
        columnLabels={labels}
      />
    </div>
  );
}
