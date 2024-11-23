"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { IBooking } from "../../types/booking-type";

import selectColumn from "./colunm/select-column";
import totalColumn from "./colunm/total-column";
import idColumn from "./colunm/id-column";
import actionColumn from "./colunm/action-column";

// todo
import processStatusColumn from "./colunm/process-status-column";
import bookingTimeColumn from "./colunm/booking-at-column";
import orderStatusColumn from "./colunm/order-status-column";

export function fetchBookingsTableColumnDefs(): ColumnDef<IBooking, unknown>[] {
  return [
    selectColumn,
    idColumn,
    bookingTimeColumn,
    totalColumn,
    // statusColum,
    orderStatusColumn,
    processStatusColumn,
    actionColumn,
  ];
}
