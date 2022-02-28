import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { SimpleTabs } from './SimpleTabs';
import { Intro } from './Intro';
import { HelpPanel } from './HelpPanel';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
  },
  help: {
    position: "fixed",
    bottom: "20px",
    left: "10px"
  }
}));

export const Main: React.FC = () => {

  const classes = useStyles();

  const [line, setLine] = React.useState("ARD");
  const [isHelpOpen, toggleHelpOpen] = React.useState<boolean>(false);
  const [helpTitle, setHelpTitle] = React.useState("Help");
  const [helpText, setHelpText] = React.useState("This is the help drawer.");
  const toggleHelp = () => toggleHelpOpen(!isHelpOpen);

  return (
    <div className={classes.root}>
      <SimpleTabs setHelpTitle={setHelpTitle} setHelpText={setHelpText} />
      <HelpPanel isOpen={isHelpOpen} toggle={toggleHelp} helpTitle={helpTitle} helpText={helpText} />
      <Button onClick={toggleHelp} className={classes.help} variant="outlined">Help</Button>
    </div>
  );
}
