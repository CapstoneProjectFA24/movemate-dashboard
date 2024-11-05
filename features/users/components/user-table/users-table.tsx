"use client";

import * as React from "react";
import { getUsersByRole } from "../../action/users";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { IUser } from "../../type.ts/user-type";
import { ColumnDef } from "@tanstack/react-table";
import { fetchUserTableColumnDefs } from "./user-table-column-def";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSearchableColumn } from "@/types/table";
import { generateColumnLabels } from "@/components/data-table/column-label-mapping";

interface ServicesTableProps {
  data: ApiListResponse<IUser>;
}

export function UsersTable({ data }: ServicesTableProps) {
  const { data: userData, pageCount } = data;

  const columns = React.useMemo<ColumnDef<IUser, unknown>[]>(
    () => fetchUserTableColumnDefs(),
    []
  );
  const searchableColumns: DataTableSearchableColumn<IUser>[] = [
    {
      id: "name",
      title: "Tên",
    },
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
