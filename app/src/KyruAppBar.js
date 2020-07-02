import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';


function KyruAppBar () {
  return (
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Kyru
            </Typography>
          </Toolbar>
        </AppBar>
  ) ;
}

export default KyruAppBar;

