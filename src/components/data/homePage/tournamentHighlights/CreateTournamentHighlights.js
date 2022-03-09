import React, { useState } from 'react';
import {
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Alert,
  TextField,
} from '@mui/material';
import { db, storage } from '../../../config/fbConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, updateMetadata } from 'firebase/storage';

const CreateTournamentHighlights = () => {
  const [eventName, setEventName] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventPath, setEventPath] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const imagesRef = ref(
      storage,
      `tournamenthighlights/${eventName.replace(/\s/g, '')}.${eventImage.name
        .split('.')
        .pop()}`
    );

    await uploadBytes(imagesRef, eventImage).then((snapshot) => {
      console.log('Uploaded file!', snapshot);
    });

    const newMetadata = {
      contentType: 'image/jpeg',
    };

    await updateMetadata(imagesRef, newMetadata)
      .then((metadata) => {
        console.log('File type changed to image', metadata);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });

    await addDoc(collection(db, 'tournamenthighlights'), {
      eventName,
      eventPath,
      completed: true,
      image: imagesRef.fullPath,
    }).then(() => {
      setSuccess('Tournament Successfully added!');
      setEventName('');
      setEventImage('');
      setEventPath('');
      setTimeout(() => {
        setSuccess('');
      }, 4000);
    });
  }

  return (
    <Box sx={{ minWidth: 300, maxWidth: 500, margin: '2rem' }}>
      <Card variant='outlined'>
        <CardContent>
          <h2 style={{ textAlign: 'center' }}>Add Tournament Highlight</h2>
          {success && <Alert severity='success'>{success}</Alert>}
          <Divider />
          <div style={{ margin: '1rem' }}>
            <TextField
              fullWidth
              id='name'
              type='text'
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
              label='Event Name'
            />
          </div>
          <div style={{ margin: '1rem' }}>
            <input
              type='file'
              accept='image/*'
              onChange={(event) => setEventImage(event.target.files[0])}
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '1rem',
                lineHeight: '1.5rem',
                padding: '1rem',
                maxWidth: 200,
              }}
            />
          </div>
          <div style={{ margin: '1rem' }}>
            <TextField
              fullWidth
              id='path'
              type='text'
              value={eventPath}
              onChange={(event) => setEventPath(event.target.value)}
              label='On-click path'
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateTournamentHighlights;
