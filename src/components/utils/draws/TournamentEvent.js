import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const TournamentEvent = ({ tournament }) => {
  return (
    <div style={{ margin: '1rem' }}>
      <Accordion
        sx={{
          margin: '1rem 0',
        }}
      >
        <AccordionSummary
          sx={{
            backgroundColor: 'rgb(18, 18, 18)',
            color: 'rgb(255, 255, 255)',
          }}
          expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(255, 255, 255)' }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h5'>{tournament.tournamentName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12, lg: 10 }}
          >
            {[
              'Hopes Boys',
              'Hopes Girls',
              'Cadet Boys',
              'Cadet Girls',
              'Sub-Junior Boys',
              'Sub-Junior Girls',
              'Junior Boys',
              'Junior Girls',
              'Youth Boys',
              'Youth Girls',
              'Mens',
              'Womens',
            ].map((event, index) => {
              return (
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={4}
                  lg={2}
                  key={index}
                  sx={{ textAlign: 'center' }}
                >
                  <Link
                    to={{
                      pathname: `/createDraws/${tournament.tournamentName
                        .replace(/\s/g, '')
                        .toLowerCase()}/${event
                        .replace(/\s/g, '')
                        .toLowerCase()}`,
                      tournamentDetails: tournament,
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant='contained' sx={{ minWidth: '15rem' }}>
                      {event}
                    </Button>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TournamentEvent;
