import React, { useState } from 'react';
import { Button, Alert, TextareaAutosize, Divider } from '@mui/material';

import { db } from '../../../config/fbConfig';
import { collection, addDoc } from 'firebase/firestore';

const data = {
  profile: `Karnataka Table Tennis Association (KTTA) was established more than fifty years ago for the promotion of Table Tennis in Karnataka. The State Association has to its credit organised, a number of National events right from the year, 1969, when the National championship was held and from then on, many National events have been held in Karnataka. In the past, Junior Nationals in 2001, Mayor's Cup in 2003, South Zone National Ranking Tournament in 2004, Inter Institutional Championship in 2005 and in 2016, and National Ranking Championship (South Zone) in 2010, 2012 and in 2017 were conducted successfully.    Karnataka has produced several great players (including arjuna awardees) in Table Tennis who have been national champions and have played in international meets.  
KTTA is now making good progress in promoting the game with renewed vigour, largely due to the committed members. The Association is headed by Sri Dinesh Gundurao, Member of the Legislative Assembly of Karnataka as President. The Association believes it has much to contribute to the game of Table Tennis in the years to come.
In the past, tournaments and championships organised by KTTA have been amply supported by the Public Sector giants Indian Oil Corporation Ltd. and leading financial Institutions of the country like State Bank of India and Canara Bank, among other organisations in the Public Sector and in the Private Sector.
KTTA enjoys active support by the affiliated District Table Tennis Associations in its endeavour to promote the game.
It is the express commitment of KTTA to explore ways and means to recognise talented young boys and girls at the grass root level in the State and promote their growth to become competitive players at the national and international level in the years to come.`,
  vision: `The Association Aspires To Facilitate Karnataka State Contributing Predominantly To The Composition Of The Table Tennis Contingents That Represent India in Prestigious International Tournaments`,
  mission: [
    'To Explore Ways & Means to Draw Talented Players to Competitive Table Tennis',
    'Exploring Ways & Means to Build a Financially  Strong Association',
    'Facilitate creation of Quality training centres Throughout The State',
    'Facilitate creation of a pool of Qualified Coaches',
    'Facilitate Creation Of a pool of  Qualified Technical Officials',
    'Achieve membership of 1000 players by 2020 and 2000 players by 2025',
  ],
};

const Ktta = () => {
  const [profile, setProfile] = useState(data.profile);
  const [vision, setVision] = useState(data.vision);
  const [mission, setMission] = useState(data.mission);
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
    !profile || !vision || !mission
      ? handleError('All fields required')
      : await addDoc(collection(db, 'aboutktta'), {
          profile,
          vision,
          mission,
          updatedOn: new Date(),
        }).then(() => {
          setSuccess('Successfully updated!');
          setTimeout(() => {
            setSuccess('');
          }, 4000);
        });
  }

  return (
    <div>
      {/* add skeleton and loading variable */}
      {success && <Alert severity='success'>{success}</Alert>}
      {error && <Alert severity='error'>{error}</Alert>}
      <div
        style={{
          margin: '1rem',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '1.5rem',
        }}
      >
        <label htmlFor='profile'>Our Profile</label>
      </div>
      <div style={{ margin: '1rem' }}>
        <TextareaAutosize
          id='profile'
          minRows={6}
          maxRows={8}
          aria-label='profile'
          defaultValue={profile}
          style={{
            width: '97.3%',
            padding: '1rem',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '1rem',
            lineHeight: '1.5rem',
            textAlign: 'justify',
            border: '1px solid #999',
            borderRadius: '5px',
          }}
          onChange={(event) => setProfile(event.target.value)}
        />
      </div>
      <Divider />
      <div
        style={{
          margin: '1rem',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '1.5rem',
        }}
      >
        <label htmlFor='vision'>Our Vision</label>
      </div>
      <div style={{ margin: '1rem' }}>
        <TextareaAutosize
          id='vision'
          minRows={6}
          maxRows={8}
          aria-label='vision'
          defaultValue={vision}
          style={{
            width: '97.3%',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '1rem',
            lineHeight: '1.5rem',
            padding: '1rem',
            textAlign: 'justify',
            border: '1px solid #999',
            borderRadius: '5px',
          }}
          onChange={(event) => setVision(event.target.value)}
        />
      </div>
      <Divider />
      <div
        style={{
          margin: '1rem',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '1.5rem',
        }}
      >
        <label htmlFor='mission'>Our Mission</label>
      </div>
      <div style={{ margin: '1rem' }}>
        <TextareaAutosize
          id='mission'
          minRows={6}
          maxRows={8}
          aria-label='mission'
          defaultValue={mission}
          style={{
            width: '97.3%',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '1rem',
            lineHeight: '1.5rem',
            padding: '1rem',
            textAlign: 'justify',
            border: '1px solid #999',
            borderRadius: '5px',
          }}
          onChange={(event) => setMission(event.target.value)}
        />
      </div>
      <div style={{ textAlign: 'center', margin: '2rem' }}>
        <Button variant='outlined' onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Ktta;
