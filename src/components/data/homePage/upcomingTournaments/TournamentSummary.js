import React from 'react';
import { Grid, Box, Card, CardContent, Divider } from '@mui/material';
import moment from 'moment';

const TournamentSummary = ({ tournamentData }) => {
  const { tournamentName, tournamentDescription, startDate, endDate } =
    tournamentData;

  return (
    <Box sx={{ minWidth: 275, backgroundColor: 'rgb(225, 225, 225, 0.3)' }}>
      <Card variant='outlined'>
        <CardContent>
          <h2 style={{ textAlign: 'center' }}>{tournamentName}</h2>
          <p style={{ margin: '1rem', textAlign: 'justify' }}>
            {tournamentDescription}
          </p>
          <Divider />
          <div style={{ margin: '1rem' }}></div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                container
                spacing={0}
                direction='column'
                alignItems='center'
                justify='center'
              >
                Start:&nbsp;{moment(startDate.toDate()).format('LL')}
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                container
                spacing={0}
                direction='column'
                alignItems='center'
                justify='center'
              >
                End:&nbsp;{moment(endDate.toDate()).format('LL')}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TournamentSummary;
