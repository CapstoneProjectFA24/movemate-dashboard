"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { IAssignment } from "../../types/assignemts-type";

import bookingAtColumn from "./column/booking-at-column";
import typeColum from "./column/type-column";
import numberColumn from "./column/number-colum";
import statusColumn from "./column/status-column";
import customerPhoneColumn from "./column/customer-phone-column";
import customerNameColumn from "./column/customer-name-column";
import actionColumn from "./column/action-column";
import bookingIdColumn from "./column/bookingid-column";
import selectColumn from "./column/select-column";
import idColumn from "./column/id-column";



export function fetchExceptionTableColumnDefs(): ColumnDef<IAssignment, unknown>[] {
  return [
    selectColumn,
    idColumn,
    bookingIdColumn,
    bookingAtColumn,
    typeColum,
    numberColumn,
    statusColumn,
    customerPhoneColumn,
    customerNameColumn,
    actionColumn,
  ];
}
