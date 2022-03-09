import React, { useState } from 'react';
import {
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Alert,
  TextField,
  Typography,
  CardActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { db } from '../../../config/fbConfig';
import { collection, addDoc } from 'firebase/firestore';

const PlayersTab = () => {
  const [rankingYear, setRankingYear] = useState('');
  const [eventName, setEventName] = useState('');
  const [tournamentEvent, setTournamentEvent] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleError = (message) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 4000);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // !rankingYear || !tournamentDescription || !endDate || !startDate
    //   ? handleError('All fields required')
    //   : endDate <= startDate
    //   ? handleError('Tournament ends before it starts!')
    //   : await addDoc(collection(db, 'upcomingtournaments'), {
    //       rankingYear,
    //       tournamentDescription,
    //       startDate,
    //       endDate,
    //       completed: false,
    //       address: tournamentAddress,
    //       location: { lat: latitude, lng: longitude },
    //     }).then(() => {
    //       setSuccess('Tournament Successfully added!');
    //       setRankingYear('');
    //       setTournamentAddress('');
    //       setTournamentDescription('');
    //       setStartDate(new Date());
    //       setEndDate(new Date());
    //       setTimeout(() => {
    //         setSuccess('');
    //       }, 4000);
    //     });
  }

  const addEvent = () => {
    var tournamentEventList = tournamentEvent;
    tournamentEventList.push(eventName);
    console.log(tournamentEventList);
    setTournamentEvent(tournamentEventList);
    setEventName('');
  };

  const deleteEvent = (name) => {
    const filteredEvents = tournamentEvent.filter((item) => item !== name);
    setTournamentEvent(filteredEvents);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item md={7}>
          <Box sx={{ minWidth: 300, margin: '2rem' }}>
            <Card variant='outlined'>
              {/*  make accordian */}
              <Typography
                variant='h4'
                sx={{ textAlign: 'center', margin: '1rem' }}
              >
                {rankingYear ? rankingYear : 'Year'}
              </Typography>
              <Divider sx={{ margin: '0 1rem' }} />
              <CardContent>
                <Box sx={{ width: '100%' }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    {tournamentEvent.map((event, index) => {
                      return (
                        <Grid
                          item
                          xs={4}
                          sx={{ textAlign: 'center' }}
                          key={index}
                        >
                          {/* make card with delete option */}
                          <Card sx={{ backgroundColor: '#eceff1' }}>
                            <CardActions sx={{ float: 'right' }}>
                              {/* <Button size='small'> */}
                              <DeleteIcon
                                sx={{
                                  color: '#b71c1c',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                                onClick={() => deleteEvent(event)}
                              />
                              {/* </Button> */}
                            </CardActions>
                            <CardContent>
                              <Typography variant='h5'>{event}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item md={5}>
          <Card variant='outlined' sx={{ margin: '2rem' }}>
            <Typography
              variant='h4'
              sx={{ textAlign: 'center', margin: '1rem' }}
            >
              Add year and events
            </Typography>
            <Divider sx={{ margin: '0 1rem' }} />
            <CardContent>
              <form>
                <div style={{ margin: '1rem' }}>
                  <TextField
                    fullWidth
                    id='Year'
                    type='text'
                    value={rankingYear}
                    onChange={(event) => setRankingYear(event.target.value)}
                    label='Year'
                  />
                </div>
                <Box sx={{ width: '100%', margin: '1rem' }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item sm={8} md={8}>
                      <TextField
                        fullWidth
                        id='Event Name'
                        type='text'
                        value={eventName}
                        onChange={(event) => setEventName(event.target.value)}
                        label='Event Name'
                      />
                    </Grid>
                    <Grid item sm={4} md={4}>
                      <Button
                        variant='outlined'
                        sx={{ height: '3rem' }}
                        onClick={addEvent}
                      >
                        Add Event
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                <div
                  style={{ margin: '0 1rem 1rem 1rem', float: 'right' }}
                ></div>
                <div style={{ margin: '1rem', textAlign: 'center' }}>
                  <Button variant='contained' type='submit'>
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayersTab;
