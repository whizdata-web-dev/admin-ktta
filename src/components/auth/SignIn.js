import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
} from '@mui/material';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Grid
        container
        spacing={1}
        direction='column'
        alignItems='center'
        justify='center'
      >
        <Grid item xs={12}>
          <Box
            sx={{
              minWidth: 300,
              maxWidth: 500,
              margin: '2rem',
            }}
          >
            <Card variant='outlined'>
              <CardContent>
                <form className='form'>
                  <div style={{ margin: '1rem' }}>
                    <TextField
                      fullWidth
                      id='email'
                      type='text'
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      label='Email'
                    />
                  </div>
                  <div style={{ margin: '1rem' }}>
                    <TextField
                      fullWidth
                      id='password'
                      type='text'
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      label='Password'
                    />
                  </div>
                </form>
              </CardContent>
              <CardActions>
                <Button type='button' color='primary'>
                  Log in
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
