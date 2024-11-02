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
import { getServices } from "../../action/services";
import { fetchServicesTableColumnDefs } from "./service-table-column-def";
import { IService } from "../../type/services-type";

interface ServicesTableProps {
  servicesPromise: ReturnType<typeof getServices>;
}

export function ServicesTable({ servicesPromise }: ServicesTableProps) {
  const { data, pageCount } = React.use(servicesPromise);

  const columns = React.useMemo<ColumnDef<IService, unknown>[]>(
    () => fetchServicesTableColumnDefs(),
    []
  );
  const labels = generateColumnLabels(columns);

  const searchableColumns: DataTableSearchableColumn<IService>[] = [
    {
      id: "name",
      title: "dịch vụ",
    },
  ];

  const filterableColumns: DataTableFilterableColumn<IService>[] = [
    {
      id: "type",
      title: "Loại dịch vụ",
      options: Object.entries(ServiceTypeNames).map(([value, label]) => ({
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
      <DataTable
        dataTable={dataTable}
        columns={columns}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
        newRowLink="/dashboard/services/create_service"
        columnLabels={labels}
      />
    </div>
  );
}
