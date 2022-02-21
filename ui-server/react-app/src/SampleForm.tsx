import * as React from "react";
import * as ReactDOM from "react-dom";
import { TextField, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
    },
  }),
);

type FormProps = {
  message: String,
  handleMessageChange: any,
  submitForm: any
}

export const SampleForm = ({message, handleMessageChange, submitForm}: FormProps) => {
  const classes = useStyles();


  return (
    <div>
        <TextField 
            variant="filled"
            id="duration"
            label="message"
            helperText="test message"
            type="string" 
            value={message}
            onChange={handleMessageChange}
            style={{"margin": "10px"}}
        />
        <Button onClick={submitForm}
            variant="contained"
            color="primary"
            style={{"width": "80px", "margin": "10px"}}>
          Submit
        </Button>
    </div>
  );
}
