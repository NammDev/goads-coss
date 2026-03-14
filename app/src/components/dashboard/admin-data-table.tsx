'use client'

import { Fragment, type ReactNode, useId, useMemo, useState } from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  SearchIcon,
} from 'lucide-react'
import type { Column, ColumnDef, ColumnFiltersState, PaginationState, RowData, SortingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { usePagination } from '@/hooks/use-pagination'
import { cn } from '@/lib/utils'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select'
  }
}

type AdminDataTableProps<T> = {
  data: T[]
  columns: ColumnDef<T, unknown>[]
  /** Renders expanded row content below the row */
  renderExpandedRow?: (row: T) => ReactNode
  searchPlaceholder?: string
  /** Column key used for global search filter */
  searchColumn?: string
  pageSize?: number
  /** Optional toolbar rendered next to page-size selector */
  toolbar?: ReactNode
  /** Custom empty state rendered when table has no data */
  emptyState?: ReactNode
  /** Page-size options for the "Show" dropdown (default: [5, 10, 25, 50]) */
  pageSizeOptions?: number[]
  /** Column IDs to render per-column filter UI for (uses column meta.filterVariant) */
  filterColumns?: string[]
}

/** Reusable admin datatable matching DT5 invoice layout */
export function AdminDataTable<T>({
  data,
  columns,
  renderExpandedRow,
  searchPlaceholder = 'Search...',
  searchColumn,
  pageSize = 10,
  toolbar,
  emptyState,
  pageSizeOptions = [5, 10, 25, 50],
  filterColumns,
}: AdminDataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnFilters, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: filterColumns ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: filterColumns ? getFacetedUniqueValues() : undefined,
    getFacetedMinMaxValues: filterColumns ? getFacetedMinMaxValues() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: renderExpandedRow ? getExpandedRowModel() : undefined,
    enableSortingRemoval: false,
    getRowCanExpand: renderExpandedRow ? () => true : undefined,
  })

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: table.getState().pagination.pageIndex + 1,
    totalPages: table.getPageCount(),
    paginationItemsToDisplay: 2,
  })

  return (
    <div className="w-full">
      {/* Toolbar + Table in single bordered container */}
      <div className="border-b">
        {/* Toolbar row — matches DT5 layout */}
        <div className="flex gap-6 p-6 max-lg:flex-col lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-muted-foreground text-base font-normal max-sm:sr-only">
                Show
              </Label>
              <Select
                value={table.getState().pagination.pageSize.toString()}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="w-fit whitespace-nowrap">
                  <SelectValue placeholder="Select number of results" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto">
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {toolbar}
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-4 lg:justify-end">
            {/* Search input */}
            <div className="w-full max-w-2xs">
              <div className="relative">
                <Input
                  className="peer pl-9"
                  placeholder={searchPlaceholder}
                  value={
                    searchColumn
                      ? ((table.getColumn(searchColumn)?.getFilterValue() as string) ?? '')
                      : globalFilter
                  }
                  onChange={(e) =>
                    searchColumn
                      ? table.getColumn(searchColumn)?.setFilterValue(e.target.value)
                      : setGlobalFilter(e.target.value)
                  }
                  aria-label={searchPlaceholder}
                  type="text"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                  <SearchIcon size={16} />
                </div>
              </div>
            </div>
            {/* Per-column filters */}
            {filterColumns?.map((colId) => {
              const col = table.getColumn(colId)
              return col ? <ColumnFilter key={colId} column={col} /> : null
            })}
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="h-14 border-t">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-muted-foreground first:pl-4 last:px-4 last:text-center"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className="flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            header.column.getToggleSortingHandler()?.(e)
                          }
                        }}
                        tabIndex={0}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {
                          {
                            asc: <ChevronUpIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
                            desc: <ChevronDownIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
                          }[header.column.getIsSorted() as string] ?? null
                        }
                      </div>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && 'selected'}
                    className={cn(
                      renderExpandedRow ? 'cursor-pointer' : 'hover:bg-transparent',
                      row.getIsExpanded() && 'bg-muted/50'
                    )}
                    onClick={() => renderExpandedRow && row.toggleExpanded()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="h-14 first:pl-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && renderExpandedRow && (
                    <TableRow key={`${row.id}-expanded`} className="bg-muted/30 hover:bg-muted/30">
                      <TableCell colSpan={row.getVisibleCells().length} className="p-4">
                        {renderExpandedRow(row.original)}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                  {emptyState ?? (
                    <div className="flex h-24 items-center justify-center text-muted-foreground">
                      No results.
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination — always visible */}
      <div className="flex items-center justify-between gap-3 px-6 py-4 max-sm:flex-col md:max-lg:flex-col">
        <p className="text-muted-foreground text-sm whitespace-nowrap" aria-live="polite">
          Showing{' '}
          <span>
            {table.getRowCount() === 0
              ? 0
              : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}{' '}
            to{' '}
            {Math.min(
              Math.max(
                table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                  table.getState().pagination.pageSize,
                0
              ),
              table.getRowCount()
            )}
          </span>{' '}
          of <span>{table.getRowCount()} entries</span>
        </p>
        {table.getPageCount() > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="ghost"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon aria-hidden="true" />
                  Previous
                </Button>
              </PaginationItem>
              {showLeftEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {pages.map((page) => {
                const isActive = page === table.getState().pagination.pageIndex + 1
                return (
                  <PaginationItem key={page}>
                    <Button
                      size="icon"
                      className={cn(
                        !isActive && 'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40'
                      )}
                      onClick={() => table.setPageIndex(page - 1)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                )
              })}
              {showRightEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <Button
                  variant="ghost"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  Next
                  <ChevronRightIcon aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}

/** Per-column filter — renders select dropdown or text input based on column meta.filterVariant */
function ColumnFilter<T>({ column }: { column: Column<T, unknown> }) {
  const id = useId()
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnHeader = typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id

  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === 'range') return []
    const values = Array.from(column.getFacetedUniqueValues().keys())
    const flattened = values.reduce<string[]>((acc, curr) => {
      if (Array.isArray(curr)) return [...acc, ...curr]
      return [...acc, curr]
    }, [])
    return Array.from(new Set(flattened)).sort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column.getFacetedUniqueValues(), filterVariant])

  if (filterVariant === 'select') {
    return (
      <div className="w-full max-w-2xs">
        <Label htmlFor={`${id}-select`} className="sr-only">
          {columnHeader}
        </Label>
        <Select
          value={columnFilterValue?.toString() ?? 'all'}
          onValueChange={(value) => column.setFilterValue(value === 'all' ? undefined : value)}
        >
          <SelectTrigger id={`${id}-select`} className="w-full capitalize">
            <SelectValue placeholder={`Select ${columnHeader}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {sortedUniqueValues.map((value) => (
              <SelectItem key={String(value)} value={String(value)} className="capitalize">
                {String(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xs">
      <Label htmlFor={`${id}-input`} className="sr-only">
        {columnHeader}
      </Label>
      <div className="relative">
        <Input
          id={`${id}-input`}
          className="peer pl-9"
          value={(columnFilterValue ?? '') as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Search ${columnHeader.toLowerCase()}`}
          type="text"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  )
}
