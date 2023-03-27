import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Switch, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

export default function ButtonAppBar({ check, change, user }) {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const totalCalc = user.shareValues.reduce(
    (runningTotal, shareValues) =>
      (runningTotal += shareValues.currentMarketValue * shareValues.numshares),
    0
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box>
            <Button color="inherit">
              <Link to="/">Home</Link>
            </Button>
          </Box>
          <Box>
            <Button color="inherit">
              <Link to="/view">View</Link>
            </Button>
          </Box>
          {/* <Box>
            <Switch
              {...label}
              color="default"
              onChange={change}
              checked={check}
            />
          </Box> */}
          <Typography variant="h6">User: {user.name}</Typography>
          <Typography variant="h6">Portfolio Total: £{totalCalc}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
