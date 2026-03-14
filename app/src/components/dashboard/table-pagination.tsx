'use client'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'
import type { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TablePaginationProps<T> {
  table: Table<T>
  pageSizeOptions?: number[]
}

export function TablePagination<T>({
  table,
  pageSizeOptions = [5, 10, 25, 50],
}: TablePaginationProps<T>) {
  const { pageIndex, pageSize } = table.getState().pagination
  const pageCount = table.getPageCount()

  return (
    <div className="flex items-center justify-between gap-8 px-4 py-4">
      <div className="hidden items-center gap-2 lg:flex">
        <Label htmlFor="rows-per-page" className="text-sm font-medium whitespace-nowrap">
          Rows per page
        </Label>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger size="sm" className="w-20 cursor-pointer" id="rows-per-page">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-fit items-center justify-center text-sm font-medium">
        Page {pageIndex + 1} of {pageCount || 1}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="hidden size-8 lg:flex cursor-pointer"
          size="icon"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label="Go to first page"
        >
          <ChevronsLeftIcon />
        </Button>
        <Button
          variant="outline"
          className="size-8 cursor-pointer"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Go to previous page"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          className="size-8 cursor-pointer"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Go to next page"
        >
          <ChevronRightIcon />
        </Button>
        <Button
          variant="outline"
          className="hidden size-8 lg:flex cursor-pointer"
          size="icon"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="Go to last page"
        >
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  )
}
