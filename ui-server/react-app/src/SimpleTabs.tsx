import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box, Paper } from '@material-ui/core';
import { SampleFormControl } from './SampleFormControl';
import { DOE } from './DOE';
import { SampleTrackerControl } from './SampleTrackerControl';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box padding={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    bottom: 0
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Sample Form" {...a11yProps(0)} />
          <Tab label="DOE" {...a11yProps(1)} />
          <Tab label="Sample Tracker" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <SampleFormControl />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DOE />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SampleTrackerControl />
      </TabPanel>
    </div>
  );
}
