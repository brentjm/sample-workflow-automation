import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dialog, Button } from '@material-ui/core';
import { QrReader } from 'react-qr-reader';


type QRReaderProps = {
  dialogOpen: boolean,
  handleDialogOpen: Function,
  setQRData: Function
}

export const QRReader: React.FC<QRReaderProps> = ({dialogOpen, handleDialogOpen, setQRData}) => {

  return (
    <Dialog open={dialogOpen}>
      <div style={{width: "500px", height: "500px"}}>
        <Button onClick={()=>handleDialogOpen()}>Close</Button>
        {dialogOpen ?
          <QrReader
            containerStyle={{width: "500px", height: "300px"}}
            videoStyle={{width: "500px", height: "300px"}}
            videoContainerStyle={{width: "500px", height: "300px"}}
            constraints={{facingMode: 'user'}}
            onResult={(result, error) => {
              if (!!result) {
                setQRData(result.getText());
                handleDialogOpen();
              }

              if (!!error) {
                console.log(error);
              }
            }}
          />
        : ""}
      </div>
    </Dialog>
  );
};
