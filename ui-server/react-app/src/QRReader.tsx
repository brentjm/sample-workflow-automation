import * as React from "react";
import * as ReactDOM from "react-dom";
import { QrReader } from 'react-qr-reader';

export const QRReader: React.FC = (props) => {


  const [data, setData] = React.useState('No result');

  return (
    <div style={{width: "100px"}}>
      <QrReader
        constraints={{facingMode: 'user'}}
        onResult={(result, error) => {
          if (!!result) {
            setData(result.getText());
          }

          if (!!error) {
            console.log(error);
          }
        }}
      />
      <p>result: {data}</p>
    </div>
  );
};
