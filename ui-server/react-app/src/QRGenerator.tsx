import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Menu, MenuItem, Dialog } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import QRCode from "react-qr-code";
import Spreadsheet from "react-spreadsheet";

type QRGeneratorProps = {
  setHelpTitle: Function,
  setHelpText: Function
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({setHelpTitle, setHelpText}) => {

  setHelpTitle("Print sample labels");
  setHelpText(`This table provides an interface to print sample labels.
    Use the above menue to select the project desired to have
    sample labels. After selecting the project, press the generate labels, 
    and a dialog will open with the sample labels. The labels can be scanned in
    the "SAMPLE READER" tab to associate the label with the sample information.`);

  const [projectNames, setProjectNames] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [projectData, setProjectData] = React.useState({data: [], header: [], notes: ""});
  const [projectCodes, setProjectCodes] = React.useState([]);
  const initialData = new Array(20).fill(new Array(26).fill({value: ""}));
  const [spreadsheetData, setSpreadsheetData] = React.useState(initialData);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  React.useEffect(() => {
    getProjectNames();
  }, []);

  const getProjectNames = () => {
    let url = process.env.REACT_APP_SERVERIP+"/getProjectNames";
    fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      setProjectNames(resp);
    })
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    getProjectData(projectNames[index]);
    setAnchorEl(null);
  };
  
  const getProjectData = (projectName: string) => {
    let url = new URL(process.env.REACT_APP_SERVERIP+"/getProjectData");
    url.searchParams.append("project_name", projectName);
    fetch(url.toString())
    .then(resp => resp.json())
    .then(resp => {
      setProjectData(resp)
      formatSpreadsheetData(resp)
    })
  }

  const createQRCodes = () => {
    let codes = projectData.data.map((e)=> {
      return (JSON.stringify({
        id: e.slice(-1)[0],
        projectName: projectNames[selectedIndex],
        notes: projectData.notes
      }))
    })
    setProjectCodes(codes);
    toggleDialog();
  }

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  }

  const formatSpreadsheetData = (data) => {
    let formattedData = [];
    let row = [];
    for (let i=0; i < data.header.length; i++) {
      row = [];
      for (let j=0; j < data.header[0].length; j++) {
        row.push({value: String(data.header[i][j])});
      }
      formattedData.push(row)
    }
    for (let i=0; i < data.data.length; i++) {
      row = [];
      for (let j=0; j < data.data[0].length; j++) {
        row.push({value: String(data.data[i][j])});
      }
      formattedData.push(row);
    }
    setSpreadsheetData(formattedData);
  }

  const handleSpreadsheetChange = () => {
    alert("Not editable");
  }

  const projectList = () => {
    let list = projectData.data.map((itm) => (
      <p>{itm.slice(-1)[0]}</p>
    ))
    return list
  }

  return (
    <div style={{display: "flex", flexDirection: "row", height: "80vh", width: "80vw", margin: "auto", textAlign: "center"}}>
      <Paper elevation={3} style={{textAlign: "left", width: "70%", height: "70%", padding: "2%"}}>
        <div style={{display: "flex", flexDirection: "row", height: "20%", width: "100%"}}>
          
          <div style={{width: "100%"}}>
            <Button
              style={{width: "80%"}}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleMenuClick}
              variant="outlined"
            >
              Selected Project: {projectNames[selectedIndex]}
              <ArrowDropDown />
            </Button>
            <Menu
              PaperProps={{  
              style: {  
                width: "20%",  
              },
              }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleSelect}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {projectNames.map((projectName, index) => (
                <MenuItem 
                  key={index}
                  onClick={()=>handleSelect(index)}
                >
                  {projectName}
                </MenuItem>
              ))}

            </Menu>
          </div>

          <Button
            id="basic-button"
            onClick={createQRCodes}
            style={{width: "10%"}}
          >
          print
          </Button><br/>
        </div>

        <div style={{display: "flex", flexDirection: "row", width: "100%", height: "80%", overflow: "hidden", textAlign: "center"}}>
          <div style={{width: "20%", height: "100%", padding: "1%"}}>
            <h4>eln</h4>
            <Paper elevation={4} style={{padding: "1%", height: "70%", width: "90%", overflow: "auto"}}>
              {projectList()}
            </Paper>
          </div>
          <div style={{width: "80%", height: "100%", padding: "1%"}}>
            <h4>Project Notes</h4>
            <Paper elevation={4} style={{padding: "1%", height: "70%", width: "90%", overflow: "auto", marginLeft: "5%"}}>
              {projectData.notes}
            </Paper>
          </div>
        </div>

      </Paper>
      <Dialog open={dialogOpen}>
        <h4>Use your browser to print</h4>
        <Button onClick={toggleDialog}>Close</Button>
        {
          projectCodes.map((itm, indx) => (
            <div style={{padding: "50px"}}>
              {projectData.data[indx].slice(-1)[0]}
              <QRCode key={indx} value={itm} />
            </div>
          ))
        }
      </Dialog>
    </div>
  );
};
