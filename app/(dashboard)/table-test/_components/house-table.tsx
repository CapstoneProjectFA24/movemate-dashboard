"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import { getHouses } from "@/lib/actions/house";
import { fetchHousesTableColumnDefs } from "./product-table-column-def";
import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";
import { toast } from "sonner";
import { IHouse } from "@/features/services/type/house-type";

interface HouseTableProps {
  housePromise: ReturnType<typeof getHouses>;
}

export function HouseTable({ housePromise }: HouseTableProps) {
  const { data, pageCount } = React.use(housePromise);

  const columns = React.useMemo<ColumnDef<IHouse, unknown>[]>(
    () => fetchHousesTableColumnDefs(),
    []
  );

  const searchableColumns: DataTableSearchableColumn<IHouse>[] = [
    {
      id: "name",
      title: "tên nhà",
    },
  ];

  const filterableColumns: DataTableFilterableColumn<IHouse>[] = [
    {
      id: "name",
      title: "type",
      options: ["WAITING", "COMING", "LIVE", "END"].map((status) => ({
        label: status[0]?.toUpperCase() + status.slice(1),
        value: status,
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
    <div className="space-y-4 overflow-hidden">
      <DataTable
        dataTable={dataTable}
        columns={columns}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
        //   floatingBarContent={TasksTableFloatingBarContent(dataTable)}
        //   deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
      />
    </div>
  );
}
