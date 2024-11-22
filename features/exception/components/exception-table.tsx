"use client";

import React from "react";
import { getAssignments } from "../action/get-assignments";
import { ColumnDef } from "@tanstack/react-table";
import { IAssignment } from "../types/assignemts-type";
import { generateColumnLabels } from "@/components/data-table/column-label-mapping";
import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { fetchExceptionTableColumnDefs } from "./exception-table-column-def";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, Users } from "lucide-react";
import { DataTableDark } from "@/components/data-table/data-table-dark";
import { AssignmentTypeNames } from "../enums/exception-enum";

interface ExceptionTableProps {
  assignmentPromise: ReturnType<typeof getAssignments>;
}

export function ExceptionTable({ assignmentPromise }: ExceptionTableProps) {
  const { data, pageCount } = React.use(assignmentPromise);

  const columns = React.useMemo<ColumnDef<IAssignment, unknown>[]>(
    () => fetchExceptionTableColumnDefs(),
    []
  );

  const labels = generateColumnLabels(columns);

  const searchableColumns: DataTableSearchableColumn<IAssignment>[] = [
    {
      id: "name",
      title: "dịch vụ",
    },
  ];

  const filterableColumns: DataTableFilterableColumn<IAssignment>[] = [
    {
      id: "type",
      title: "Tất cả ngoại lệ",
      options: Object.entries(AssignmentTypeNames).map(([value, label]) => ({
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
    <div className="h-full flex flex-col space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Yêu Cầu Chưa Phân Công
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{12}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loại Ngoại Lệ</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="text-sm">Thiếu Tài Xế: {8}</div>
              <div className="text-sm">Thiếu Nhân Viên Bốc Xếp: {4}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Thời Gian Chờ TB
            </CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{15}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Yêu Cầu Đang Chờ
          </CardTitle>
        </CardHeader>

        <CardContent>
          <DataTableDark
            dataTable={dataTable}
            columns={columns}
            searchableColumns={searchableColumns}
            filterableColumns={filterableColumns}
            // newRowLink="/dashboard/services/create_service"
            columnLabels={labels}
          />
        </CardContent>
      </Card>
    </div>
  );
}
