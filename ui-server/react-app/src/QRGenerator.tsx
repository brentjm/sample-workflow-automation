import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Menu, MenuItem } from '@material-ui/core';
import QRCode from "react-qr-code";

type ProjectsProps = {
  projectName: String,
  setProjectName: Function
}

const Projects: React.FC<ProjectsProps> = ({projectName, setProjectName}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    let url = "http://"+process.env.REACT_APP_SERVERIP+"/getProjects";
    fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      setProjects(resp);
    })
  }, []);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (index: number) => {
    setProjectName(projects[index]);
    setAnchorEl(null);
  };

  return (
    <div style={{textAlign: "left"}}>
      <Button
        style={{width: "300px"}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Selected Project Name: {projectName}
      </Button>
      <Menu
        PaperProps={{  
        style: {  
          width: 350,  
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
        {projects.map((projectName, index) => (
          <MenuItem 
            key={index}
            onClick={()=>handleSelect(index)}>{projectName}
          </MenuItem>
        ))}

      </Menu>
    </div>
  );
}

export const QRGenerator: React.FC = (props) => {

  const [projectName, setProjectName] = React.useState('Project');
  const [projectData, setProjectData] = React.useState({data:[[1,2], [1, 2]]});
  const [projectCodes, setProjectCodes] = React.useState([]);

  const getQR = () => {
    let url = new URL("http://"+process.env.REACT_APP_SERVERIP+"/getProjectData");
    url.searchParams.append("project_name", projectName);
    fetch(url.toString())
    .then(resp => resp.json())
    .then(resp => {
      setProjectData(resp)
      let codes = resp.data.map((e)=>e.slice(-1)[0]);
      setProjectCodes(codes);
    })
  }

  console.log(projectData);

  return (
    <div style={{width: "100px", padding: "200px", textAlign: "center"}}>
      <Projects projectName={projectName} setProjectName={setProjectName} />
      <Button
        id="basic-button"
        onClick={getQR}
        style={{width: "300px"}}
      >
        Get QR codes
      </Button>
      {projectCodes.map((id, indx) => (
        <div style={{padding: "50px"}}>
          <QRCode value={JSON.stringify({id: id, projectName: projectName, data: projectData.data[indx]})} />
        </div>
      ))}
    </div>
  );
};
