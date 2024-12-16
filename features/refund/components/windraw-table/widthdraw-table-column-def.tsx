"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { IWindraw } from "../../types/windraw-type";
import idColumn from "./column/id-column";
import selectColumn from "./column/select-column";
import timeColumn from "./column/time-column";
import estimatedAmountColumn from "./column/estimated-amount-column";
import bankNameColumn from "./column/owner-column";
import actionColumn from "./column/action-column";

export function fetchWidthdrawTableColumnDefs(): ColumnDef<IWindraw, unknown>[] {
  return [
    selectColumn,
    idColumn,
    estimatedAmountColumn,
    bankNameColumn,
    timeColumn,
    actionColumn
    // bookingIdColumn,
   
  ];
}
