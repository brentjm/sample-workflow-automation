import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from '@material-ui/core';
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

  const initialData = new Array(100).fill({value: ""});

  const [data, setData] = React.useState([initialData, initialData]);

  const handleSubmit = () => {
    let numRow = data.findIndex((e) => e[0].value === "" );
    let numCol = data[0].findIndex((e) => e.value === "" );
    let newData = [];
    let row = [];
    for (let i=0; i<numRow; i++) {
      row = [];
      for (let j=0; j<numCol; j++) {
        row.push(data[i][j].value);
      }
      newData.push(row);
    }

    let url = "http://"+process.env.REACT_APP_SERVERIP+"/setDoe";
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newData)
    });
    

  };

  return (
    <div
      style={{"display": "flex", "flexDirection": "column"}}
    >
      <Button onClick={handleSubmit}>
        Submit
      </Button>
      <Spreadsheet data={data} onChange={setData} />
    </div>
  );
}
