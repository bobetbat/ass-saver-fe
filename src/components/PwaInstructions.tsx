import React from 'react';
import { Box, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import IosShareIcon from '@mui/icons-material/IosShare';

export const PwaInstructions: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5">Save PWA to Home screen</Typography>
      <Typography variant="body2" gutterBottom>
        Follow these steps to save this PWA to your dashboard:
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>For Android:</strong>
      </Typography>
      <Typography variant="body2">
        1. Open the browser menu (usually <MoreVertIcon fontSize='small' style={{ verticalAlign: 'bottom' }} /> in the top right corner).
        <br />
        2. Tap <AddToHomeScreenIcon fontSize='small' style={{ verticalAlign: 'bottom' }} /> "Add to Home screen".
        <br />
        3. Follow the prompts to add the app.
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>For iOS:</strong>
      </Typography>
      <Typography variant="body2">
        1. Open the share menu (usually <IosShareIcon fontSize='small' style={{ verticalAlign: 'bottom' }} /> at the bottom of the screen).
        <br />
        2. Tap "Add to Home Screen".
        <br />
        3. Follow the prompts to add the app.
      </Typography>
    </Box>
  );
};
