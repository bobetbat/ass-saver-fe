import * as React from 'react';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, Stack } from '@mui/material';

export const Header: React.FC = () => {
  return (
    <AppBar>
      <Box maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: 'space-between', px: '1rem', py: '0.5rem' }}
        >
          <Stack direction='row' gap={2}>
            {/* <ConnectButton /> */}
          </Stack>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
