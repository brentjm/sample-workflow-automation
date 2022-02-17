import * as React from "react";
import * as ReactDOM from "react-dom";
import { TextField, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FormBody } from './FormBody';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
    },
  }),
);

export const SampleForm: React.FC = () => {

  const classes = useStyles();

  const [state, setState] = React.useState({
    message: "Hello World from React App"
  });

  React.useEffect(() => {
    // Retrieve the state from the server database on
    // page load/reload.
    fetch("http://"+process.env.REACT_APP_SERVERIP+"/getState")
    .then(resp => resp.json())
    .then(resp => {
      setState({...state,
        message: resp["status"]
      });
    })
  }, []);

  const saveState = () => {
    let url = "http://"+process.env.REACT_APP_SERVERIP+"/setState";
    const data = JSON.stringify({
      "message": state.message
    })
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: data
    });
  }

  const handleMessageChange = (event: any) => {
    setState({...state, message: event.target.value});
  }

  const submitForm = () => {
    let url = "http://"+process.env.REACT_APP_SERVERIP+"/setState";
    const data = JSON.stringify({
      "status": state.message
    })
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: data
    });  
  }

  return (
    <div>
        <FormBody
          message={state.message}
          handleMessageChange={handleMessageChange}
          submitForm={submitForm}
        />
    </div>
  );
}
