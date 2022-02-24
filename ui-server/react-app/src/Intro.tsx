import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: "white",
    width: "50%",
    eleveation: 3,
    margin: "auto",
    padding: "5%",
  },
  font: {
    fontSize: "25px"
  }
}));

type Props = {
  setHelpTitle: Function,
  setHelpText: Function
}

export const Intro: React.FC<Props> = ({setHelpTitle, setHelpText}) => {

  const classes = useStyles();

  setHelpTitle("Intro");
  setHelpText("To begin, select your function")

  return (
    <Paper className={classes.root}>

    </Paper>
  );
}
