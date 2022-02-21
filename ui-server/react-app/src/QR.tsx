import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { QrReader } from 'react-qr-reader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
    },
  }),
);

export const QR: React.FC = (props) => {


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
