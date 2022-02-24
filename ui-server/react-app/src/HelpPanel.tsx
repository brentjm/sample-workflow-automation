import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Paper, Button, IconButton, List, ListItemText } from '@material-ui/core';
import { Close, RecordVoiceOver, RecordVoiceOverRounded } from '@material-ui/icons';
import { useSpeechSynthesis } from "react-speech-kit";

const useStyles = makeStyles({
  root: {
    height: "30vh",
    textAlign: "left"
  },
  contents: {
    display: "block",
    paddingLeft: "100px",
    paddingRight: "100px",
    elevation: "3"
  }
});

type Props = {
  isOpen: boolean,
  toggle: ()=>void,
  helpTitle: String
  helpText: String
}

export const HelpPanel: React.FC<Props> = ({isOpen, toggle, helpTitle, helpText}) => {
  const classes = useStyles();

  const { speak } = useSpeechSynthesis();

  return (
    <Drawer open={isOpen} anchor="bottom">
      <div className={classes.root}>
        <IconButton onClick={toggle} aria-label="close menu">
          <Close style={{backgroundColor: "gray", borderRadius: "20px"}}/>
        </IconButton>
        <IconButton onClick={()=>speak({text: helpText})} aria-label="speak menu">
          <RecordVoiceOverRounded />
        </IconButton>
        <Paper className={classes.contents}>
          <h4>{helpTitle}</h4>
          <p>{helpText}</p>
          
        </Paper>
      </div>
    </Drawer>
  );
}
