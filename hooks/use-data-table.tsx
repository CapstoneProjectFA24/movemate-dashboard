"use client";

import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  VisibilityState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from "@tanstack/react-table";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "./use-debounce";
import { useDebouncedCallback } from "./use-debounce-callback";

interface useDataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  pageCount?: number;
  debounceMs?: number;
  searchableColumns?: DataTableSearchableColumn<TData>[];
  filterableColumns?: DataTableFilterableColumn<TData>[];
}

export function useDataTable<TData, TValue>({
  data,
  columns,
  pageCount,
  debounceMs = 500,
  searchableColumns = [],
  filterableColumns = [],
}: useDataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Search params
  const page = searchParams?.get("page") ?? "1";
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;

  const per_page = searchParams?.get("per_page") ?? "10";
  const perPageAsNumber = Number(per_page);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

  const sort = searchParams?.get("sort");
  const [column, order] = sort?.split(".") ?? [];

  const globalSearch = searchParams?.get("search") ?? "";

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSerachParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSerachParams.delete(key);
        } else {
          newSerachParams.set(key, String(value));
        }
      }

      return newSerachParams.toString();
    },
    [searchParams]
  );

  // Initial column filters
  const initialColumnFilters: ColumnFiltersState = useMemo(() => {
    const filters: ColumnFiltersState = [];

    // Add filters for filterable columns
    Array.from(searchParams.entries()).forEach(([key, value]) => {
      const filterableColumn = filterableColumns.find(
        (column) => column.id === key
      );
      if (filterableColumn) {
        filters.push({ id: key, value: value.split(".") });
      }
    });

    // Add global search to all searchable columns
    if (globalSearch && searchableColumns.length > 0) {
      searchableColumns.forEach((column) => {
        filters.push({
          id: String(column.id),
          value: globalSearch,
        });
      });
    }

    return filters;
  }, [filterableColumns, searchableColumns, searchParams, globalSearch]);

  // Table states
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialColumnFilters);

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: fallbackPage - 1,
    pageSize: fallbackPerPage,
  });

  const debouncedUpdateUrl = useDebouncedCallback((queryString: string) => {
    router.push(`${pathname}?${queryString}`, { scroll: false });
  }, debounceMs);

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    setPagination({ pageIndex: fallbackPage - 1, pageSize: fallbackPerPage });
  }, [fallbackPage, fallbackPerPage]);

  useEffect(() => {
    const newPage = pageIndex + 1;
    const queryString = createQueryString({
      page: newPage === 1 ? null : newPage,
      per_page: pageSize === 10 ? null : pageSize,
    });
    debouncedUpdateUrl(queryString);
  }, [pageIndex, pageSize, pathname, createQueryString, debouncedUpdateUrl]);

  const [sorting, setSorting] = useState<SortingState>([
    { id: column ?? "", desc: order === "desc" },
  ]);

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page,
        sort: sorting[0]?.id
          ? `${sorting[0]?.id}.${sorting[0]?.desc ? "desc" : "asc"}`
          : null,
      })}`
    );
  }, [sorting, pathname, createQueryString, router, page]);
  
  // Handle server-side filtering
  // const debouncedSearchableColumnFilters = JSON.parse(
  //   useDebounce(
  //     JSON.stringify(
  //       columnFilters.filter((filter) => {
  //         return searchableColumns.find((column) => column.id === filter.id);
  //       })
  //     ),
  //     500
  //   )
  // ) as ColumnFiltersState;

  // Handle server-side filtering
  const debouncedColumnFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter((filter) => {
          return searchableColumns.find((column) => column.id === filter.id);
        })
      ),
      500
    )
  ) as ColumnFiltersState;

  const filterableColumnFilters = columnFilters.filter((filter) => {
    return filterableColumns.find((column) => column.id === filter.id);
  });

  useEffect(() => {
    // Initialize new params
    const newParamsObject: Record<string, string | null> = {
      page: null,
      per_page: null,
    };

    // Handle global search
    const searchValue =
      debouncedColumnFilters.length > 0
        ? (debouncedColumnFilters[0].value as string)
        : null;

    if (searchValue) {
      newParamsObject.search = searchValue;
    } else {
      newParamsObject.search = null;
    }

      // // Handle debounced searchable column filters
      // for (const column of debouncedSearchableColumnFilters) {
      //   if (typeof column.value === "string") {
      //     Object.assign(newParamsObject, {
      //       [column.id]: typeof column.value === "string" ? column.value : null,
      //     });
      //   }
      // }

    // Handle filterable column filters
    for (const column of filterableColumnFilters) {
      if (typeof column.value === "object" && Array.isArray(column.value)) {
        newParamsObject[column.id] = column.value.join(".");
      }
    }

    // Remove deleted filterable values
    for (const key of searchParams.keys()) {
      if (
        filterableColumns.find((column) => column.id === key) &&
        !filterableColumnFilters.find((column) => column.id === key)
      ) {
        newParamsObject[key] = null;
      }
    }

    // After cumulating all the changes, push new params
    router.push(`${pathname}?${createQueryString(newParamsObject)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(debouncedColumnFilters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(filterableColumnFilters),
    pathname,
    createQueryString,
    router,
    searchParams,
    filterableColumns,
  ]);

  const dataTable = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return { dataTable };
}
