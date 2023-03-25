import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Switch } from '@mui/material';
import { Link } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function ButtonAppBar({ check, change }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">
            <Link to="/">Home</Link>
          </Button>
          <Box>
            <Switch
              {...label}
              defaultChecked
              color="default"
              onChange={change}
              checked={check}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
