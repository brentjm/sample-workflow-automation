import * as React from "react";
import * as ReactDOM from "react-dom";
import QRCode from "react-qr-code";

export const QRGenerator: React.FC = (props) => {


  const [data, setData] = React.useState('No result');

  return (
    <div style={{width: "100px"}}>
      <QRCode value={"PFEf3453453"} />
    </div>
  );
};
