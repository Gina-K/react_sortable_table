import React, { useState } from "react";
import { useTable } from "react-table/src/hooks/useTable";
import { useGlobalFilter } from "react-table/src/plugin-hooks/useGlobalFilter";
import { useSortBy } from "react-table/src/plugin-hooks/useSortBy";
import { usePagination } from "react-table/src/plugin-hooks/usePagination";

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

  return (
    <>
      {/*  Search  */}
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search"}
      />


      {/*  Table  */}
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc ? " ↓" : " ↑"
                    : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
        </thead>

        <tbody {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>;
              })}
            </tr>
          );
        })}
        </tbody>
      </table>

      {/*  Pagination  */}
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        {" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        {" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        {" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
        {" "}

        <span>Page{" "}
          <strong>{pageIndex + 1} of {pageOptions.length}</strong>{" "}
        </span>

        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={changeEvent => {
              const page = changeEvent.target.value ? Number(changeEvent.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </span>{" "}

        <select
          value={pageSize}
          onChange={changeEvent => {
            setPageSize(Number(changeEvent.target.value));
          }}
        >
          {[10, 25, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Table;