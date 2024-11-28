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
import { ITransaction } from "../../types/transaction-type";
import { getTransactions } from "../../action/transactions";
import { fetchTransactionsTableColumnDefs } from "./transaction-table-column-def";
import { PayemntMethodType } from "../../enums/transaction-enum";
import { Skeleton } from "@/components/ui/skeleton";
import { FlexibleDatePicker } from "@/components/data-table/custom-table/date-range-picker";

interface TransactionsTableProps {
  transactionsPromise: ReturnType<typeof getTransactions>;
}

export function TransactionsTable({
  transactionsPromise,
}: TransactionsTableProps) {
  const { data, pageCount } = React.use(transactionsPromise);

  const columns = React.useMemo<ColumnDef<ITransaction, unknown>[]>(
    () => fetchTransactionsTableColumnDefs(),
    []
  );
  const labels = generateColumnLabels(columns);

  const searchableColumns: DataTableSearchableColumn<ITransaction>[] = [
    {
      id: "id",
      title: "dịch vụ",
    },
  ];

  const filterableColumns: DataTableFilterableColumn<ITransaction>[] = [
    {
      id: "paymentMethod",
      title: "Phương thức thanh toán",
      options: Object.entries(PayemntMethodType).map(([value, label]) => ({
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
      <React.Suspense
        fallback={<Skeleton className="h-7 w-52" />}
      ></React.Suspense>
      <DataTable
        dataTable={dataTable}
        columns={columns}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
        columnLabels={labels}
      />
    </div>
  );
}
