import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddOfficeBearer from './AddOfficeBearer';
import OfficeBearersList from './OfficeBearersList';

const OfficeBearers = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '70vh',
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <OfficeBearersList />
        </Grid>
        <Grid item xs={4}>
          <AddOfficeBearer />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OfficeBearers;
