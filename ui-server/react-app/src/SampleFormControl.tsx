import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SampleForm } from './SampleForm';


export const SampleFormControl: React.FC = () => {


  const [state, setState] = React.useState({
    message: "Hello World from React App"
  });

  React.useEffect(() => {
    // Retrieve the state from the server database on
    // page load/reload.
    let url = process.env.REACT_APP_SERVERIP+"/getState";
    fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      setState({...state,
        message: resp["status"]
      });
    })
  }, []);

  const saveState = () => {
    let url = process.env.REACT_APP_SERVERIP+"/setState";
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
    let url = process.env.REACT_APP_SERVERIP+"/setState";
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
        <SampleForm
          message={state.message}
          handleMessageChange={handleMessageChange}
          submitForm={submitForm}
        />
    </div>
  );
}
