import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Stack,
  Paper,
  Divider,
  Card,
  CardMedia,
  Skeleton,
  Typography,
} from '@mui/material';
import PlayerData from './PlayerData';

export default function PlayerCard() {
  const [loading, setLoading] = useState(true);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div style={{ margin: '1rem', minHeight: '80vh' }}>
      <Card style={{ padding: '1rem', minHeight: '50vh' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          divider={<Divider orientation='vertical' flexItem />}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Item sx={{ maxHeight: '50vh' }}>
            {!loading ? (
              <Skeleton
                sx={{ width: 300, height: 200 }}
                animation='wave'
                variant='rectangular'
              />
            ) : (
              <CardMedia
                component='img'
                sx={{ width: 300 }}
                image='https://firebasestorage.googleapis.com/v0/b/ttoneapp.appspot.com/o/officebearers%2FShriPralhadJoshi.jpg?alt=media&token=795a0ba2-4ddd-499f-959b-347bd7c99bd9'
                alt='Live from space album cover'
              />
            )}
            {!loading ? (
              <>
                <Skeleton
                  animation='wave'
                  width='90%'
                  sx={{
                    marginBottom: 6,
                    margin: '1rem',
                  }}
                />
              </>
            ) : (
              <Typography varient='h4' sx={{ margin: '1rem 0' }}>
                Name
              </Typography>
            )}
            {!loading ? (
              <>
                <Skeleton
                  animation='wave'
                  width='90%'
                  sx={{
                    marginBottom: 6,
                    margin: '1rem',
                  }}
                />
              </>
            ) : (
              <Typography varient='h4' sx={{ margin: '1rem 0' }}>
                Academy
              </Typography>
            )}
            {!loading ? (
              <>
                <Skeleton
                  animation='wave'
                  width='90%'
                  sx={{
                    marginBottom: 6,
                    margin: '1rem',
                  }}
                />
              </>
            ) : (
              <Typography varient='h4' sx={{ margin: '1rem 0' }}>
                Guardian's Name
              </Typography>
            )}
            {!loading ? (
              <>
                <Skeleton
                  animation='wave'
                  width='90%'
                  sx={{
                    marginBottom: 6,
                    margin: '1rem',
                  }}
                />
              </>
            ) : null}
          </Item>
          <Item sx={{ width: '100%' }}>
            <PlayerData />
          </Item>
        </Stack>
      </Card>
    </div>
  );
}
