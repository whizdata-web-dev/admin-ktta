import TableCell from '@mui/material/TableCell';
import moment from 'moment';

export default function TournamentRow({ tournamentData, index }) {
  return (
    <>
      <TableCell style={{ width: '5rem' }} align='center'>
        {index + 1}
      </TableCell>
      <TableCell
        style={{ width: 'fit-content', maxWidth: '10rem' }}
        align='left'
      >
        {tournamentData.tournamentName}
      </TableCell>
      <TableCell style={{ width: 'fit-content', maxWidth: 300 }} align='left'>
        {tournamentData.tournamentDescription}
      </TableCell>
      <TableCell style={{ width: 'fit-content' }} align='center'>
        {moment(tournamentData.startDate.toDate()).format('LL')}
      </TableCell>
      <TableCell style={{ width: 'fit-content' }} align='center'>
        {moment(tournamentData.endDate.toDate()).format('LL')}
      </TableCell>
    </>
  );
}
