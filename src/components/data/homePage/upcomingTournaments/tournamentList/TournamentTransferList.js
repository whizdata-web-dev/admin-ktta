import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { db } from '../../../../config/fbConfig';
import {
  doc,
  updateDoc,
  collection,
  query,
  onSnapshot,
} from 'firebase/firestore';
import Tournament from '../Tournament';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TournamentTransferList() {
  const [tournamentList, setTournamentList] = useState([]);

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  useEffect(() => {
    const tournamentQuery = query(collection(db, 'tournaments'));
    const unsub = onSnapshot(tournamentQuery, (querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ ...doc.data(), id: doc.id });
      });
      setLeft(tempData.filter((tournament) => tournament.completed === false));
      setRight(tempData.filter((tournament) => tournament.completed === true));
      setTournamentList(tempData);
    });
    return () => unsub();
  }, []);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const toggleCompleted = (tournamentDetail) => {
    tournamentDetail.map(async (tournament) => {
      await updateDoc(doc(db, 'tournaments', tournament.id), {
        completed: !tournament.completed,
      });
    });
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    toggleCompleted(leftChecked);
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    toggleCompleted(rightChecked);
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card sx={{ minHeight: '80vh', height: 'fit-content', minWidth: '40vh' }}>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${items.length} tournaments`}
      />
      <Divider />
      <List
        sx={{
          width: 'fit-content',
          // maxWidth: 400,
          height: 'fit-content',
          bgcolor: 'background.paper',
        }}
        dense
        component='div'
        role='list'
      >
        {items.map((value) => {
          return (
            <ListItem
              key={value.tournamentName}
              role='listitem'
              // button
              // onClick={handleToggle(value)}
            >
              <ListItemIcon onClick={handleToggle(value)}>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': `transfer-list-all-item-${value.tournamentName}-label`,
                  }}
                />
              </ListItemIcon>
              {/* <ListItemText
                id={`transfer-list-all-item-${value.tournamentName}-label`}
                primary={value.tournamentName}
              > */}
              <Accordion
                TransitionProps={{ unmountOnExit: true }}
                key={value.tournamentName}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id={`transfer-list-all-item-${value.tournamentName}-label`}
                >
                  <Typography>{value.tournamentName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Tournament tournamentData={value} />
                </AccordionDetails>
              </Accordion>
              {/* </ListItemText> */}
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent='center'
      alignItems='center'
      sx={{ margin: '1rem' }}
    >
      <Grid item>{customList('Upcoming Tournaments', left)}</Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Button
            sx={{
              my: 0.5,
              backgroundColor: leftChecked.length ? '#00b8d4' : '#fff',
            }}
            variant='contained'
            size='large'
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'
          >
            &gt;
          </Button>
          <Button
            sx={{
              my: 0.5,
              backgroundColor: rightChecked.length ? '#00b8d4' : '#fff',
            }}
            variant='contained'
            size='large'
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected left'
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Tournaments Complete', right)}</Grid>
    </Grid>
  );
}
