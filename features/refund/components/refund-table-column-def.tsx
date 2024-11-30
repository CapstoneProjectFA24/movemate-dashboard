"use client";

import { type ColumnDef } from "@tanstack/react-table";
import selectColumn from "./column/select-column";
import { IRefund } from "../types/refund-type";
import idColumn from "./column/id-column";




export function fetchRefundTableColumnDefs(): ColumnDef<IRefund, unknown>[] {
  return [
    selectColumn,
    idColumn,
   
  ];
}
