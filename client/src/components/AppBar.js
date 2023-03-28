import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {
  Switch,
  Typography,
  Avatar,
  IconButton,
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

const sxHeaderIcon = {
  padding: 1,
};

export default function ButtonAppBar({ check, change, user, theme }) {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [open, setOpen] = useState(false);

  const drawerWidth = 240;

  const totalCalc = user.shareValues.reduce(
    (runningTotal, shareValues) =>
      (runningTotal += shareValues.currentMarketValue * shareValues.numshares),
    0
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Box>
            <Switch
              {...label}
              color="default"
              onChange={change}
              checked={check}
            />
          </Box>
          <Typography style={{ flexGrow: 1, fontSize: '1rem' }} variant="h6">
            Portfolio Total: £{totalCalc}
          </Typography>
          <Typography style={{ padding: 10, fontSize: '1rem' }} variant="h6">
            {user.name}
          </Typography>
          <Avatar src="https://e7.pngegg.com/pngimages/447/446/png-clipart-elon-musk-tesla-motors-tesla-model-3-spacex-tesla-company-car-thumbnail.png" />
        </Toolbar>
        <SwipeableDrawer
          width={drawerWidth}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
          <Divider />
          <List>
            <ListItem>
              <HomeRoundedIcon sx={sxHeaderIcon} />
              <Link
                style={{ textDecoration: 'none', margin: 0 }}
                to="/"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </ListItem>
            <ListItem>
              <TrendingUpIcon sx={sxHeaderIcon} />
              <Link
                style={{ textDecoration: 'none', margin: 0 }}
                to="/view"
                onClick={() => setOpen(false)}
              >
                View
              </Link>
            </ListItem>
            <ListItem>
              <TrendingUpIcon sx={sxHeaderIcon} />
              <Link
                style={{ textDecoration: 'none', margin: 0 }}
                to="/view"
                onClick={() => setOpen(false)}
              >
                News
              </Link>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
}
