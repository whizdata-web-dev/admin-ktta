import React, { useState } from 'react';
import {
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Alert,
  TextField,
  TextareaAutosize,
} from '@mui/material';

import { db, storage } from '../../../config/fbConfig';
import { ref, uploadBytes, updateMetadata } from 'firebase/storage';
import { collection, updateDoc, doc } from 'firebase/firestore';

const OfficeBearer = ({ memberData }) => {
  const [name, setName] = useState(memberData.name);
  const [designation, setDesignation] = useState(memberData.designation);
  const [description, setDescription] = useState(memberData.description);
  const [image, setImage] = useState(null);
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

    const imagesRef = ref(
      storage,
      `officebearers/${name.replace(/\s/g, '')}.${image.name.split('.').pop()}`
    );

    await uploadBytes(imagesRef, image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    const newMetadata = {
      contentType: 'image/jpeg',
    };

    await updateMetadata(imagesRef, newMetadata)
      .then((metadata) => {
        console.log('File type changed to image');
      })
      .catch((error) => {
        console.log('Error: ', error);
      });

    !name || !description || !image || !designation
      ? handleError('All fields required')
      : await updateDoc(doc(db, 'officebearers', memberData.id), {
          name,
          description,
          designation,
          image: imagesRef.fullPath,
        }).then(() => {
          setSuccess('Successful!');
          setTimeout(() => {
            setSuccess('');
          }, 4000);
        });
  }

  return (
    <Box sx={{ minWidth: 200, maxWidth: 350, margin: '1rem' }}>
      <Card variant='outlined'>
        <CardContent>
          {success && <Alert severity='success'>{success}</Alert>}
          {error && <Alert severity='error'>{error}</Alert>}
          <div style={{ margin: '1rem 1rem 1rem 0.5rem', textAlign: 'center' }}>
            <img src={memberData.image} width='300' />
          </div>
          <Divider />
          <div style={{ margin: '1rem 0' }}>
            <input
              required
              type='file'
              accept='image/*'
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '1rem',
                lineHeight: '1.5rem',
                padding: '1rem',
                maxWidth: 400,
              }}
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>
          <h2 style={{ textAlign: 'center', margin: '1rem' }}>
            <TextField
              fullWidth
              id='name'
              type='text'
              value={name}
              onChange={(event) => setName(event.target.value)}
              label='Name'
            />
          </h2>
          <div style={{ margin: '1rem' }}>
            <TextField
              fullWidth
              id='designation'
              type='text'
              value={designation}
              onChange={(event) => setDesignation(event.target.value)}
              label='Designation'
            />
          </div>
          <div style={{ margin: '1rem' }}>
            <TextareaAutosize
              minRows={2}
              maxRows={4}
              style={{
                minWidth: 200,
                width: '100%',
                maxWidth: 250,
                padding: '1rem',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '0.9rem',
                lineHeight: '1.5rem',
                textAlign: 'justify',
                border: '1px solid #999',
                borderRadius: '5px',
              }}
              id='description'
              type='text'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              label='Description'
            />
          </div>
          <div style={{ textAlign: 'center', margin: '2rem 0 0 0 ' }}>
            <Button variant='contained' onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OfficeBearer;
