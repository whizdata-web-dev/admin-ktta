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
} from '@mui/material';
import { db } from '../../../config/fbConfig';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const CreateTournament = () => {
  const [stateName, setStateName] = useState('');
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentAddress, setTournamentAddress] = useState('');
  const [tournamentDescription, setTournamentDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  // take address and geocode to display location - AIzaSyB1NzrAGXwu8xHOvDF6oPRXu43wgpzk0vQ

  const handleError = (message) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 4000);
  };

  async function geocodeAddress(address) {
    const url =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      address +
      '.json?access_token=pk.eyJ1IjoidmlwaW5iaGFyYWR3YWowMjUiLCJhIjoiY2t1aHNvdmwxMmg5ZjMxbW9sMXI3YTlhMSJ9.tcuPj-hYm5E_JDGR-gEH7A';

    await fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setLatitude(result.features[0].center[1]);
          setLongitude(result.features[0].center[0]);
          setSuccess('Location found, place : ', result.features[0].place_name);
          setTimeout(() => {
            setSuccess('');
          }, 4000);
        },
        (error) => {
          handleError(error);
        }
      );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    var curDate = new Date();
    var curYear = curDate.getFullYear();

    !tournamentName || !tournamentDescription || !endDate || !startDate
      ? handleError('All fields required')
      : endDate <= startDate
      ? handleError('Tournament ends before it starts!')
      : await addDoc(collection(db, 'tournaments'), {
          tournamentName,
          tournamentDescription,
          startDate,
          endDate,
          completed: false,
          address: tournamentAddress,
          location: { lat: latitude, lng: longitude },
        })
          // .then(() => {
          //   setDoc(
          //     doc(
          //       db,
          //       'tournaments',
          //       `${stateName.replace(/\s/g, '').toLowerCase()}_${tournamentName
          //         .replace(/\s/g, '')
          //         .toLowerCase()}_${curYear}`
          //     ),
          //     {
          //       year: curYear,
          //       tournamentName,
          //     }
          //   );
          // })
          .then(() => {
            setSuccess('Tournament Successfully added!');
            setStateName('');
            setTournamentName('');
            setTournamentAddress('');
            setTournamentDescription('');
            setStartDate(new Date());
            setEndDate(new Date());
            setTimeout(() => {
              setSuccess('');
            }, 4000);
          });
  }

  return (
    <Box sx={{ minWidth: 300, maxWidth: 500, margin: '2rem' }}>
      <Card variant='outlined'>
        <CardContent>
          <h2 style={{ textAlign: 'center' }}>Add New Tournament</h2>
          {success && <Alert severity='success'>{success}</Alert>}
          {error && <Alert severity='error'>{error}</Alert>}
          <Divider />
          <div style={{ margin: '1rem' }}>
            <TextField
              fullWidth
              id='name'
              type='text'
              value={tournamentName}
              onChange={(event) => setTournamentName(event.target.value)}
              label='Tournament Name'
            />
          </div>
          <div style={{ margin: '1rem' }}>
            <TextField
              fullWidth
              id='description'
              type='text'
              value={tournamentDescription}
              onChange={(event) => setTournamentDescription(event.target.value)}
              label='Tournament Description'
            />
          </div>
          <div style={{ margin: '1rem' }}>
            <TextField
              fullWidth
              id='address'
              type='text'
              value={tournamentAddress}
              onChange={(event) => setTournamentAddress(event.target.value)}
              label='Tournament Address'
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button
              variant='outlined'
              onClick={() => geocodeAddress(tournamentAddress)}
            >
              Get Location
            </Button>
          </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid
                  item
                  xs={6}
                  container
                  spacing={0}
                  direction='column'
                  alignItems='center'
                  justify='center'
                >
                  <div style={{ margin: '1rem' }}>
                    <DesktopDatePicker
                      label='Tournament Start Date'
                      inputFormat='MM/dd/yyyy'
                      value={startDate}
                      onChange={(value) => setStartDate(value)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}
                  container
                  spacing={0}
                  direction='column'
                  alignItems='center'
                  justify='center'
                >
                  <div style={{ margin: '1rem' }}>
                    <DesktopDatePicker
                      label='Tournament End Date'
                      inputFormat='MM/dd/yyyy'
                      value={endDate}
                      onChange={(value) => setEndDate(value)}
                      renderInput={(params) => <TextField {...params} />}
                      style={{ width: 300 }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Box>
          </LocalizationProvider>
          <div style={{ margin: '1rem' }}>
            <TextField
              fullWidth
              id='state'
              type='text'
              value={stateName}
              onChange={(event) => setStateName(event.target.value)}
              label='State'
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button onClick={handleSubmit} variant='contained'>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateTournament;
