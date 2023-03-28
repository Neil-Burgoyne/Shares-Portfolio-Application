import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {
  Switch,
  Typography,
  Avatar,
  IconButton,
  Hidden,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState } from 'react';

const sxHeaderText = {
  flexGrow: 1,
  fontSize: '1rem',
};

const sxHeaderIcon = {
  padding: 1,
};

export default function ButtonAppBar({ check, change, user }) {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [open, setOpen] = useState(false);

  const totalCalc = user.shareValues.reduce(
    (runningTotal, shareValues) =>
      (runningTotal += shareValues.currentMarketValue * shareValues.numshares),
    0
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Box>
            <Button color="inherit">
              <HomeRoundedIcon sx={sxHeaderIcon} />
              <Link to="/">Home</Link>
            </Button>
          </Box>
          <Box>
            <Button color="inherit">
              <TrendingUpIcon sx={sxHeaderIcon} />
              <Link to="/view">View</Link>
            </Button>
          </Box>
          <Box>
            <Switch
              {...label}
              color="default"
              onChange={change}
              checked={check}
            />
          </Box>
          <Typography sx={sxHeaderText} variant="h6">
            Portfolio Total: £{totalCalc}
          </Typography>
          <Typography sx={sxHeaderText} variant="h6">
            {user.name}
          </Typography>
          <Avatar src="https://e7.pngegg.com/pngimages/447/446/png-clipart-elon-musk-tesla-motors-tesla-model-3-spacex-tesla-company-car-thumbnail.png" />
        </Toolbar>
        <SwipeableDrawer open={true}>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <Divider />
          <List>
            <ListItem>
              <Link style={{ textDecoration: 'none' }} to="/">
                Home
              </Link>
            </ListItem>
            <ListItem>
              <Link style={{ textDecoration: 'none' }} to="/view">
                View
              </Link>
            </ListItem>
          </List>
          Drawer
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
}
