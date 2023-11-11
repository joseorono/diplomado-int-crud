import { useState } from "react";
import { Table as ChakraTable, Text, Box, Flex, IconButton, Select, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { LuChevronDown, LuChevronFirst, LuChevronLast, LuChevronLeft, LuChevronRight, LuChevronUp } from 'react-icons/lu'

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  onRowClick?: (row: TData) => void
}

const Table = <TData extends object>({ data, columns, onRowClick }: TableProps<TData>) => {

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Box
      flex={1}
      borderRadius={'0.25em'}
      borderWidth={'1px'}
      borderStyle={'solid'}
      borderColor={'ActiveBorder'}
    >
      <Box overflowX={'auto'}>
        <ChakraTable>
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      :
                      <Flex
                        cursor={header.column.getCanSort() ? 'pointer' : 'auto'}
                        onClick={header.column.getToggleSortingHandler()}
                        alignItems={'center'}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <LuChevronUp />,
                          desc: <LuChevronDown />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    }
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map(row => (
              <Tr key={row.id} cursor={'pointer'} onClick={() => onRowClick && onRowClick(row.original)}>
                {row.getVisibleCells().map(cell => (
                  <Td key={cell.id} maxWidth={cell.column.columnDef.id === 'Actions' ? '3em' : 'auto'}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
      </Box>
      {/* Table controls */}
      <Flex p={2} justifyContent={'space-between'} flexWrap={'wrap'}>
        {/* Pagination control */}
        <Flex flex={1}>
          <IconButton
            variant={'link'}
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
            icon={<LuChevronFirst />}
            aria-label='First page'
            minW={{ base: 6, sm: 8 }}
          />
          <IconButton
            variant={'link'}
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            icon={<LuChevronLeft />}
            aria-label='Previous page'
            minW={{ base: 6, sm: 8 }}
          />
          <IconButton
            variant={'link'}
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
            icon={<LuChevronRight />}
            aria-label='Next page'
            minW={{ base: 6, sm: 8 }}
          />
          <IconButton
            variant={'link'}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
            icon={<LuChevronLast />}
            aria-label='Last page'
            minW={{ base: 6, sm: 8 }}
          />
        </Flex>
        {/* Page count */}
        <Flex flex={1} alignItems={'center'} justifyContent={'center'} gap={1}>
          <Text as='span' display={{ base: 'none', sm: 'inline' }}>Page</Text>
          <Text as='span' noOfLines={1} whiteSpace={'nowrap'}>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</Text>
        </Flex>
        {/* Rows per page */}
        <Flex flex={1} justifyContent={'flex-end'} alignItems={'center'} gap={1}>
          <Text display={{ base: 'none', md: 'block' }}>Items per page</Text>
          <Select
            width={'5em'}
            variant={'filled'}
            borderRadius={'3xl'}
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[1, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Table