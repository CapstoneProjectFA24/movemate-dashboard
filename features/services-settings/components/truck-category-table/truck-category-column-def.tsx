"use client";

import { ITruckCategory } from "@/features/services/types/services-type";
import { type ColumnDef } from "@tanstack/react-table";
import idColumn from "./column/id-column";
import selectColumn from "./column/select-column";
import truckCategoryNameColumn from "./column/truck-category-name-column";
import maxloadColumn from "./column/max-load-column";
import estimatedLengthColumn from "./column/estimated-length-column";
import estimatedWidthColumn from "./column/estimated-width-column";
import estimatedHeightColumn from "./column/estimated-height-column";
import actionColumn from "./column/action-column";



export function fetchTruckCategoryTableColumnDefs(): ColumnDef<ITruckCategory, unknown>[] {
  return [
    selectColumn,
    idColumn,
    truckCategoryNameColumn,
    maxloadColumn,
    estimatedLengthColumn,
    estimatedWidthColumn,
    estimatedHeightColumn,
    actionColumn
  ];
}
