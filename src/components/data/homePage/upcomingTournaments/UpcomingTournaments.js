import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TournamentListTable from './tournamentTable/TournamentListTable';
import CreateTournament from './CreateTournament';
import TournamentTransferList from './tournamentList/TournamentTransferList';

const UpcomingTournaments = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'rgb(225, 225, 225, 0.3)',
        minHeight: '90vh',
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          {/* <TournamentListTable /> */}
          <TournamentTransferList />
        </Grid>
        <Grid item xs={4}>
          <CreateTournament />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpcomingTournaments;
