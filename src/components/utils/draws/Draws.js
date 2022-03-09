// create tournament or display list to select tournament
import React, { useEffect, useState } from 'react';
import { Typography, Skeleton } from '@mui/material';

import { db } from '../../config/fbConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
import TournamentEvent from './TournamentEvent';

export default function Draws(props) {
  const [tournamentData, setTournamentData] = useState([]);

  useEffect(() => {
    const fbQuery = query(collection(db, 'tournaments'));
    const unsub = onSnapshot(fbQuery, (querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ ...doc.data(), id: doc.id });
      });
      setTournamentData(tempData);
    });
    return () => unsub();
  }, []);

  return (
    <div
      style={{
        margin: '1rem',
      }}
    >
      {tournamentData.map((tournament) => {
        return <TournamentEvent tournament={tournament} />;
      })}
    </div>
  );
}
