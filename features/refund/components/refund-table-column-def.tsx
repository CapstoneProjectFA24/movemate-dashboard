"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { IRefund } from "../types/refund-type";
import selectColumn from "./column/select-column";
import idColumn from "./column/id-column";
import bookingIdColumn from "./column/bookingId-column";
import typeColum from "./column/type-column";
import estimatedAmountColumn from "./column/estimated-amount-column";
import ownerColumn from "./column/owner-column";
import statusTrackerColumn from "./column/status-tracker-column";
import timeColumn from "./column/time-column";
import actionColumn from "./column/action-column";

export function fetchRefundTableColumnDefs(): ColumnDef<IRefund, unknown>[] {
  return [
    selectColumn,
    idColumn,
    bookingIdColumn,
    typeColum,
    estimatedAmountColumn,
    ownerColumn,
    timeColumn,
    statusTrackerColumn,
    actionColumn,
  ];
}
