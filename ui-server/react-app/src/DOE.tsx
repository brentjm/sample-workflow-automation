import * as React from "react";
import * as ReactDOM from "react-dom";
import { TextField, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Spreadsheet from "react-spreadsheet";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
    },
  }),
);

export const DOE: React.FC = () => {

  const classes = useStyles();

  const [columns, setColumns] = React.useState(1);

  const [data, setData] = React.useState([
    [{ value: "Vanilla" }, { value: "Chocolate" }, { value: "Chocolate" }, { value: "Chocolate" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }, { value: "Chocolate" }, { value: "Chocolate" }, { value: "Chocolate" }],
  ]);

  const handleColumnChange = (num: number) => {
    setColumns(num);

    setData([new Array(num).fill({value: ""})]);
  }

  return (
    <div
      style={{"display": "flex", "flexDirection": "column"}}
    >
      <TextField 
          id="columns"
          label="number columns"
          helperText="number of columns in DOE"
          type="number" 
          value={columns}
          onChange={(e)=>handleColumnChange(Number(e.target.value))}
          style={{"width": "200px"}}
      />
      <Spreadsheet data={data} onChange={setData} />
    </div>
  );
}
