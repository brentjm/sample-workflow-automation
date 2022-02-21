import * as React from "react";
import * as ReactDOM from "react-dom";
import { SampleTracker } from './SampleTracker';

export const SampleTrackerControl = () => {

  const columns = React.useMemo(
      () => [
        {
          Header: "Sample ID",
          accessor: "id" // accessor is the "key" in the data
        },
        {
          Header: "Compound",
          accessor: "compound"
        },
        {
          Header: "Method",
          accessor: "method"
        }
      ],
      []
    );
  const data = React.useMemo(
      () => [
        {
          id: "2895671",
          compound: "PF345345",
          method: "TM3454"
        },
      ],
      []
    );

  return (
    <SampleTracker columns={columns} data={data}/>
  );
}
