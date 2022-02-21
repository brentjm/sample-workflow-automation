import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useGlobalFilter, useTable } from "react-table";
import GlobalFilter from "./GlobalFilter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
    },
  }),
);

export const SampleTracker = ({ columns, data }) => {

  const classes = useStyles();

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state, //table state
    setGlobalFilter //applies global filtering to the table.
  } = useTable(
    {
      columns,
      data
    },
    useGlobalFilter
  );
  const { globalFilter } = state;

  return (
      <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
