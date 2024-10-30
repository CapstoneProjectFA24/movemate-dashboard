"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { IBooking } from "../../type/booking-type";

import selectColumn from "./colunm/select-column";
import bookingTimeColumn from "./colunm/booking-at-column";
import statusColum from "./colunm/status-column";
import totalColumn from "./colunm/total-column";
import idColumn from "./colunm/id-column";
import actionColumn from "./colunm/action-column";

export function fetchBookingsTableColumnDefs(): ColumnDef<IBooking, unknown>[] {
  return [
    selectColumn,
    idColumn,
    bookingTimeColumn,
    totalColumn,
    statusColum,
    actionColumn,
  ];
}
