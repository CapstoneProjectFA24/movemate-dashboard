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
import { DataTable } from "@/components/data-table/data-table";
import { fetchFeeTableColumnDefs } from "./fee-table-column-def";
import { getFees } from "../../actions/fees";
import { IFee } from "../../types/fee-type";

interface FeeTableProps {
  feePromise: ReturnType<typeof getFees>;
}

export function FeeTable({ feePromise }: FeeTableProps) {
  const { data, pageCount } = React.use(feePromise);

  const columns = React.useMemo<ColumnDef<IFee, unknown>[]>(
    () => fetchFeeTableColumnDefs(),
    []
  );

  const labels = generateColumnLabels(columns);

  const searchableColumns: DataTableSearchableColumn<IFee>[] = [];

  const filterableColumns: DataTableFilterableColumn<IFee>[] = [];

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  });

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Danh Sách Phí</CardTitle>
          <CardDescription>Danh sách các khoản phí dịch vụ</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            dataTable={dataTable}
            columns={columns}
            searchableColumns={searchableColumns}
            filterableColumns={filterableColumns}
            newRowLink="/dashboard/fee/create_fees"
            columnLabels={labels}
          />
        </CardContent>
      </Card>
    </div>
  );
}
