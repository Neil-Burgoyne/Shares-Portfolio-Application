import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {
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

export default function ButtonAppBar({ user }) {
  const [open, setOpen] = useState(false);

  const drawerWidth = 240;

  return (

    <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, left: 0, zIndex: 5 }}>
      <AppBar sx={{paddingBottom:'1rem', paddingTop:'1rem'}} position="static" color="primary">

        <Toolbar>
          <IconButton sx={{color:'white'}} onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Typography style={{ display: 'flex', gap:'2rem', paddingLeft:'8rem', justifyContent:'center', alignItems:'center', flexGrow: 1 }} variant="h2">
            <img src="/atlas.png" style={{ height: '7rem' }}></img>
            ATLAS WEALTH
          </Typography>
          <div sx={{display:'flex'}}>
            <Typography style={{ padding: 10, fontSize: '1.25rem' }} variant="h6">
              {user.name}
            </Typography>
            <Typography style={{ fontSize: '1rem' }} variant="h6">
              Portfolio Total: £{user.portfolioTotals.totalPortfolioValue}
            </Typography>
          </div>
          <Avatar src="https://e7.pngegg.com/pngimages/447/446/png-clipart-elon-musk-tesla-motors-tesla-model-3-spacex-tesla-company-car-thumbnail.png" />
        </Toolbar>

        {/* SWIPEABLE DRAWER COMPONENT  */}

        <SwipeableDrawer
          width={drawerWidth}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <IconButton
            onClick={() => setOpen(false)}
            disableRipple
            sx={{ display: 'flex', justifyContent: 'end' }}
          >
            <Typography style={{ color: 'white', padding: 10, fontSize: '1rem' }} variant="h6">
              {user.name}
            </Typography>
            <Avatar src="https://e7.pngegg.com/pngimages/447/446/png-clipart-elon-musk-tesla-motors-tesla-model-3-spacex-tesla-company-car-thumbnail.png" />
            <ChevronLeftIcon sx={{color:'white'}}/>
          </IconButton>
          <Divider />
          <List>
            <ListItem>
              <HomeRoundedIcon sx={sxHeaderIcon} />
              <Link
                style={{ textDecoration: 'none', margin: 0, color: 'white' }}
                to="/"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </ListItem>
            <ListItem>
              <TrendingUpIcon sx={sxHeaderIcon} />
              <Link
                style={{ textDecoration: 'none', margin: 0, color: 'white' }}
                to="/view"
                onClick={() => setOpen(false)}
              >
                View
              </Link>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
}
