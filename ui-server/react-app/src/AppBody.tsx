import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { SidePanel } from './SidePanel';
import { Header } from './Header';
import { Main } from './Main';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    height: "100vh"
  }
}));

export default function AppBody() {

  const [isDrawerOpen, toggleDrawerOpen] = React.useState<boolean>(false);
  const toggleDrawer = () => toggleDrawerOpen(!isDrawerOpen);

  return (
    <Box>
      <div style={{"height": "30px"}}>
        <Header toggleDrawer={toggleDrawer} />
      </div>
      <div style={{"marginTop": "28px"}}>
        <Main />
      </div>
      <SidePanel isOpen={isDrawerOpen} toggle={toggleDrawer}/>
    </Box>
  );
}
