import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Paper, TextField } from '@material-ui/core';
import Spreadsheet from "react-spreadsheet";

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


  const initialData = new Array(20).fill(new Array(26).fill({value: ""}));
  const [data, setData] = React.useState(initialData);
  const [projectName, setProjectName] = React.useState("PF 34534531");
  const [headerRows, setHeaderRows] = React.useState(1);
  const [notes, setNotes] = React.useState("");

  const handleSubmit = () => {
    let numRow = data.findIndex((e) => e[0].value === "" );
    let numCol = data[0].findIndex((e) => e.value === "" );
    let header = [];
    let newData = [];

    let row = [];
    for (let i=0; i < headerRows; i++) {
      row = [];
      for (let j=0; j < numCol; j++) {
        row.push(data[i][j].value);
      }
      header.push(row);
    }

    const d = new Date();
    for (let i=0; i < numRow-headerRows; i++) {
      row = [];
      for (let j=0; j < numCol; j++) {
        row.push(data[i+headerRows][j].value);
      }
      row.push(String(d.getTime())+String(i));
      newData.push(row);
    }

    let url = process.env.REACT_APP_SERVERIP + "/setDoe";
    let DOE = {
      project_name: projectName,
      header: header,
      data: newData,
      notes: notes
    };
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(DOE)
    });
  };

  return (
    <div style={{"display": "flex", "flexDirection": "row", margin: "auto", textAlign: "center", height: "60vh", width: "90vw"}} > 
      <Paper elevation={3} style={{marginRight: "0.5%", overflow: "auto", width: "70%", height: "100%"}}>
        <Spreadsheet data={data} onChange={setData} />
      </Paper>
      <Paper elevation={3} 
        style={{marginLeft: "0.5%", overflow: "auto", width: "20%", height: "100%", padding: "2%", 
                display: "flex", flexDirection: "column"}}
      >
        <TextField 
          id="project_name"
          label="project name"
          helperText="project name"
          type="string" 
          value={projectName}
          onChange={(e)=>setProjectName(e.target.value)}
          style={{"margin": "1%", width: "70%"}}
        />
        <TextField 
          id="header_rows"
          label="header rows"
          helperText="number of header rows"
          type="number" 
          value={headerRows}
          onChange={(e)=>setHeaderRows(Number(e.target.value))}
          style={{"margin": "1%", width: "30%"}}
        />
        <TextField
          id="notes"
          label="Notes"
          multiline
          maxRows={10}
          rows={10}
          value={notes}
          onChange={(e)=>setNotes(e.target.value)}
          variant="filled"
        />
        <Button onClick={handleSubmit} variant="contained" size="medium" color="primary" 
          style={{width: "20%", position: "relative", marginLeft: "70%", marginTop: "10%"}}
        >
          Submit
        </Button>
      </Paper>
    </div>
  );
}
