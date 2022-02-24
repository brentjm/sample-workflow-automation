import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Paper, TextField } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Spreadsheet from "react-spreadsheet";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
    },
  }),
);

type Props = {
  setHelpTitle: Function,
  setHelpText: Function
}

export const DOE: React.FC<Props> = ({setHelpTitle, setHelpText}) => {

  setHelpTitle("Create a new DOE");
  setHelpText(`This tab will be used by the Stats group to create a new
  DOE. The DOE can be copied from Excel and pasted above. The first
  row should be the headers, followed by the parameters. Each row will
  contain a run. When complete, press the submit button, which will save
  the DOE to a databae.`)

  const classes = useStyles();

  const [columns, setColumns] = React.useState(1);
  const initialData = new Array(20).fill(new Array(26).fill({value: ""}));
  const [data, setData] = React.useState(initialData);
  const [projectName, setProjectName] = React.useState("PF 34534531");
  const [headerRows, setHeaderRows] = React.useState(1);

  const handleSubmit = () => {
    let numRow = data.findIndex((e) => e[0].value === "" );
    let numCol = data[0].findIndex((e) => e.value === "" );
    let header = [];
    let newData = [];

    let row = [];
    for (let i=0; i<headerRows; i++) {
      row = [];
      for (let j=0; j<numCol; j++) {
        row.push(data[i][j].value);
      }
      header.push(row);
    }

    const d = new Date();
    for (let i=0; i<numRow-headerRows; i++) {
      row = [];
      for (let j=0; j<numCol; j++) {
        row.push(data[i+headerRows][j].value);
      }
      row.push(String(d.getTime())+String(i));
      newData.push(row);
    }

    let url = "http://"+process.env.REACT_APP_SERVERIP+"/setDoe";
    let DOE = {
      project_name: projectName,
      header: header,
      data: newData
    };
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(DOE)
    });
  };

  return (
    <div
      style={{"display": "flex", "flexDirection": "column"}}
    > <div style={{display: "flex", flexDirection: "row"}}>
        <Paper elevation={3} style={{margin: "20px", overflow: "auto", width: "60%"}}>
          <Spreadsheet data={data} onChange={setData} />
        </Paper>
        <Paper elevation={3} style={{margin: "20px", overflow: "auto", width: "30%", padding: "50px", display: "flex", flexDirection: "column"}}>
          <TextField 
              id="project_name"
              label="project name"
              helperText="project name"
              type="string" 
              value={projectName}
              onChange={(e)=>setProjectName(e.target.value)}
              style={{"margin": "10px", width: "200px"}}
          />
          <TextField 
              id="header_rows"
              label="header rows"
              helperText="number of header rows"
              type="number" 
              value={headerRows}
              onChange={(e)=>setHeaderRows(Number(e.target.value))}
              style={{"margin": "10px", width: "200px"}}
          />

          <Button onClick={handleSubmit} variant="contained" size="medium" color="primary" style={{width: "50px", height: "30px"}}>
            Submit
          </Button>
        </Paper>
      </div>
    </div>
  );
}
