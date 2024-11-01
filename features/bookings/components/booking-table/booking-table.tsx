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

import { generateColumnLabels } from "@/components/data-table/column-label-mapping";
import { getBookingsOff, getBookingsOnl } from "../../action/bookings";
import { IBooking } from "../../type/booking-type";
import { fetchBookingsTableColumnDefs } from "./booking-table-column-def";
import { BookingStatusNames } from "../../enums/booking-state-enum";
import { ProcessStatusNames } from "./colunm/process-status-column";
import { OrderStatusNames } from "./colunm/order-status-column";

interface BookingTableProps {
  bookingPromise: ReturnType<typeof getBookingsOnl | typeof getBookingsOff>;
}

export function BookingTable({ bookingPromise }: BookingTableProps) {
  const { data, pageCount } = React.use(bookingPromise);

  const columns = React.useMemo<ColumnDef<IBooking, unknown>[]>(
    () => fetchBookingsTableColumnDefs(),
    []
  );
  const labels = generateColumnLabels(columns);

  const searchableColumns: DataTableSearchableColumn<IBooking>[] = [
    {
      id: "id",
      title: "dịch vụ",
    },
  ];

  const filterableColumns: DataTableFilterableColumn<IBooking>[] = [
    {
      id: "status",
      title: "Trạng thái",
      options: Object.entries(BookingStatusNames).map(([value, label]) => ({
        label,
        value,
      })),
    },
    // test mode
    {
      id: "status",
      title: "Trạng thái proccess",
      options: Object.entries(ProcessStatusNames).map(([value, label]) => ({
        label,
        value,
      })),
    },
      // test mode
    {
      id: "status",
      title: "Trạng thái đơn",
      options: Object.entries(OrderStatusNames).map(([value, label]) => ({
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
        columnLabels={labels}
      />
    </div>
  );
}
