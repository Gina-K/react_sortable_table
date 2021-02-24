import React, { useState } from "react";
import { useTable } from "react-table/src/hooks/useTable";
import { useGlobalFilter } from "react-table/src/plugin-hooks/useGlobalFilter";
import { useSortBy } from "react-table/src/plugin-hooks/useSortBy";
import { usePagination } from "react-table/src/plugin-hooks/usePagination";
import MuiTable from "@material-ui/core/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  OutlinedInput,
  InputAdornment,
  TableFooter,
  IconButton,
  TextField,
  Typography,
  createMuiTheme
} from "@material-ui/core";
import {
  Search,
  LastPage,
  FirstPage,
  ChevronLeft,
  ChevronRight
} from "@material-ui/icons";

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = changeEvent => {
    const value = changeEvent.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  const containerSize = {
    maxWidth: "1024px",
    margin: "16px auto"
  };

  const footerSpacing = {
    margin: "0 2em"
  };

  return (
    <div style={containerSize}>
      <OutlinedInput
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search"}
        fullWidth={true}
        margin="dense"
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
      />

      <MuiTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} align="center">
                  {column.render("Header")}
                  <span>
                  {column.isSorted
                    ? column.isSortedDesc ? " ↓" : " ↑"
                    : ""}
                </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} align="right">
              <Typography variant="subtitle2" display="inline" style={footerSpacing}>
                Rows per page{""}
                <TextField
                  style={{ margin: "0 1em" }}
                  select
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 25, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </TextField>
              </Typography>

              <Typography variant="subtitle2" display="inline" style={footerSpacing}>
                Page{" "}
                <strong>{pageIndex + 1} of {pageOptions.length}</strong>{" "}
              </Typography>

              <Typography variant="subtitle2" display="inline" style={footerSpacing}>
                Go to page:{" "}
                <Input
                  style={{ width: "2em", margin: "0 1em" }}
                  margin="none"
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={changeEvent => {
                    const page = changeEvent.target.value ? Number(changeEvent.target.value) - 1 : 0;
                    gotoPage(page);
                  }}
                />
              </Typography>

              <IconButton size="small" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <FirstPage />
              </IconButton>
              <IconButton size="small" onClick={() => previousPage()} disabled={!canPreviousPage}>
                <ChevronLeft />
              </IconButton>
              <IconButton size="small" onClick={() => nextPage()} disabled={!canNextPage}>
                <ChevronRight />
              </IconButton>
              <IconButton size="small" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                <LastPage />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableFooter>
      </MuiTable>
    </div>
  );
}

export default Table;