import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Alert,
  TextField,
} from '@mui/material';
import { db } from '../../../config/fbConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { useHistory } from 'react-router-dom';

const Tournament = (props) => {
  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }
  const history = useHistory();

  const tournamentData =
    props.tournamentData || props.location.state.tournamentData.tournamentData;
  const [tournamentName, setTournamentName] = useState(
    tournamentData.tournamentName
  );
  const [tournamentDescription, setTournamentDescription] = useState(
    tournamentData.tournamentDescription
  );
  const [startDate, setStartDate] = useState(
    toDateTime(tournamentData.startDate.seconds)
  );
  const [endDate, setEndDate] = useState(
    toDateTime(tournamentData.endDate.seconds)
  );
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
    !tournamentName || !tournamentDescription || !endDate || !startDate
      ? handleError('All fields required')
      : endDate <= startDate
      ? handleError('Tournament ends before it starts!')
      : await updateDoc(doc(db, 'tournaments', tournamentData.id), {
          tournamentName: tournamentName,
          tournamentDescription: tournamentDescription,
          startDate: startDate,
          endDate: endDate,
        }).then(() => {
          setSuccess('Successfully updated!');
          setTimeout(() => {
            setSuccess('');
          }, 4000);
        });
    console.log(
      tournamentData.id,
      tournamentName,
      tournamentDescription,
      startDate,
      endDate
    );
  }

  async function handleDelete(e) {
    e.preventDefault();
    await deleteDoc(doc(db, 'tournaments', tournamentData.id)).then(() => {
      history.push('/upcomingtournaments');
    });
  }

  return (
    // <Box
    //   sx={{
    //     // minWidth: 300,
    //     margin: '2rem 10vw',
    //     backgroundColor: 'rgb(225, 225, 225, 0.3)',
    //   }}
    // >
    <Card variant='outlined'>
      <CardContent>
        <h2 style={{ textAlign: 'center' }}>{tournamentName}</h2>
        {success && <Alert severity='success'>{success}</Alert>}
        {error && <Alert severity='error'>{error}</Alert>}
        <Divider />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                xs={12}
                md={6}
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant='text' aria-label='text button group'>
            <Button onClick={handleSubmit}>Update</Button>
            <Button
              sx={{
                color: 'red',
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Box>
      </CardContent>
    </Card>
    // </Box>
  );
};

export default Tournament;
