import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Typography, Menu, MenuItem, Avatar } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

type Props = {
  toggleDrawer: ()=>void
}

const useStyles = makeStyles(theme => ({
  "@keyframes myEffect": {
    "0%": {
      opacity: 1,
      backgroundPosition: "50% 0%"
    },
    "10%": {
      opacity: 1,
      backgroundPosition: "100% 0%"
    },
    "20%": {
      opacity: 1,
      backgroundPosition: "50% 0%"
    },
    "100%": {
      opacity: 1,
      backgroundPosition: "50% 0%"
    }
  },
  root: {
    display: "flex",
    flexDirection: "row",
	backgroundSize: "400% 400%",
    backgroundImage: 'linear-gradient(-5deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    animation: `$myEffect 30000ms ${theme.transitions.easing.easeInOut}`,
    animationIterationCount: "infinite"
  },
  menuButton: {
    "color": theme.palette.common.white
  },
  title: {
    "margin": "auto",
    "textAlign": "center",
    "padding": "5px",
  }
}));

export const Header: React.FC<Props> = ({toggleDrawer}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const classes = useStyles();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.root}>
      <IconButton aria-label="menu" className={classes.menuButton} onClick={toggleDrawer} style={{"float": "left"}}>
        <MenuIcon />
      </IconButton>
        <Typography className={classes.title} variant="h6"><b>Smart Lab --</b> <em>Sample Workflow Automation</em></Typography>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
          <Avatar style={{width: "30px", height: "30px"}}/>
        </Button>
        <Menu
          id="user"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    </AppBar>
  );
}
