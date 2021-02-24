import React, {useState} from "react";
import {useTable} from "react-table/src/hooks/useTable";
import {useGlobalFilter} from "react-table/src/plugin-hooks/useGlobalFilter";
import {useSortBy} from "react-table/src/plugin-hooks/useSortBy";

function Table({columns, data}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter
  } = useTable({
      columns,
      data
    },
    useGlobalFilter,
    useSortBy
  );

  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = changeEvent => {
    const value = changeEvent.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  return (
    <>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search"}
      />

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
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>
              })}
            </tr>
          );
        })}
        </tbody>
      </table>
    </>
  );
}

export default Table;