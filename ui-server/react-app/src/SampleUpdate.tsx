import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Button, TextField, Snackbar, CircularProgress } from '@material-ui/core';
import { QRReader } from "./QRReader";
import Spreadsheet from "react-spreadsheet";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    video: {
      width: "400px",
      height: "300px"
    },
  }),
);

type SampleUpdateProps = {
  setHelpTitle: Function,
  setHelpText: Function
}

export const SampleUpdate: React.FC<SampleUpdateProps> = ({setHelpTitle, setHelpText}) => {
  
  const classes = useStyles();

  setHelpTitle("Scan the barcode to retrieve the data for updating")
  setHelpText(`This tab provides a QR reader to retrieve the sample data currently stored
  in the database. Once the database information is retrieved, select the update button and the
  program will attempt to find new data and aggregate it into a new dataset.`)

  const [dialogOpen, toggleDialogOpen] = React.useState(false);
  const [projectData, setProjectData] = React.useState({name: "", data: [], header: [], notes: ""});
  const [spreadsheetData, setSpreadsheetData] = React.useState([[]]);
  const [snackbarOpen, toggleSnackbarOpen] = React.useState(false);

  const handleDialogOpen = () => {
    toggleDialogOpen(!dialogOpen);
  }

  const setQRData = (QRData) => {
    let qrData = JSON.parse(QRData);
    getProjectData(qrData.projectName);
  }

  const getProjectData = (projectName: string) => {
    let url = new URL(process.env.REACT_APP_SERVERIP+"/getProjectData");
    url.searchParams.append("project_name", projectName);
    fetch(url.toString())
    .then(resp => resp.json())
    .then(resp => {
      setProjectData({name: projectName, ...resp})
      formatSpreadsheetData(resp)
    })
  }

  const formatSpreadsheetData = (data) => {
    let formattedData = [];
    let row = [];
    for (let i=0; i < data.header.length; i++) {
      row = [];
      for (let j=0; j < data.header[0].length; j++) {
        row.push({value: String(data.header[i][j]), readOnly: true});
      }
      formattedData.push(row)
    }
    for (let i=0; i < data.data.length; i++) {
      row = [];
      for (let j=0; j < data.data[0].length; j++) {
        row.push({value: String(data.data[i][j]), readOnly: true});
      }
      formattedData.push(row);
    }
    setSpreadsheetData(formattedData);
  }

  const handleUpdate = () => {
    setTimeout(()=>toggleSnackbarOpen(!snackbarOpen), 6000);
  }

  return (
    <div style={{height: "80vh", width: "80vw", margin: "auto", textAlign: "center"}}>
      <Button
        onClick={handleDialogOpen}
        variant="contained"
        color="primary"
        style={{margin: "auto", width: "50%"}}
      >
        scan
      </Button>
      <div style={{display: "flex", flexDirection: "row", height: "100%", width: "100%", margin: "2%"}}>
        <Paper elevation={3} style={{width: "20%", height: "50%", margin: "2%"}}>
          <h3>Project: {projectData.name}</h3>
          <TextField
            id="notes"
            label="Notes"
            multiline
            maxRows={10}
            rows={10}
            value={projectData.notes}
            variant="filled"
          /><br/>
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            style={{position: "relative", marginTop: "10%"}}
          >
            Update
          </Button>
        </Paper>
        <Paper style={{width: "60%", height: "50%", margin: "2%"}}>
          <QRReader dialogOpen={dialogOpen} handleDialogOpen={handleDialogOpen} setQRData={setQRData} />
          {spreadsheetData.length > 2 ? <Spreadsheet data={spreadsheetData} /> : ""}
        </Paper>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={1000} style={{width: "30%"}}>
        <div style={{width: "100%", backgroundColor: "#aaaeee", borderRadius: "50px"}}>
          <h3>No new data was obtained for project {projectData.name}</h3>
          <Button onClick={()=>toggleSnackbarOpen(!snackbarOpen)} variant="contained" color="secondary" style={{margin: "2%"}}>
            Close
          </Button>
        </div>
      </Snackbar>
    </div>
  );
};
