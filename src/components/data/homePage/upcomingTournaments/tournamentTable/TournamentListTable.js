// list, edit and delete tournaments
import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../config/fbConfig';
import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';

// table
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';

import TournamentRow from './TournamentRow';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const TournamentListTable = () => {
  let history = useHistory();
  const [tournamentList, setTournamentList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const tournamentQuery = query(collection(db, 'tournaments'));
    const unsub = onSnapshot(tournamentQuery, (querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ ...doc.data(), id: doc.id });
      });
      setTournamentList(tempData);
    });
    return () => unsub();
  }, []);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - tournamentList.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ flexGrow: 1, margin: '2rem' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
          <TableHead>
            <TableRow style={{ backgroundColor: '#2196f3' }}>
              <TableCell align='center' style={{ color: '#fff' }}>
                Sl No
              </TableCell>
              <TableCell align='left' style={{ color: '#fff' }}>
                Tournament Name
              </TableCell>
              <TableCell align='left' style={{ color: '#fff' }}>
                About the tournament
              </TableCell>
              <TableCell align='center' style={{ color: '#fff' }}>
                Starts On
              </TableCell>
              <TableCell align='center' style={{ color: '#fff' }}>
                Ends On
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tournamentList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tournamentList
            ).map((tournamentData, index) => (
              <TableRow
                key={tournamentData.tournamentName}
                onClick={() =>
                  history.push(`/upcomingtournaments/${tournamentData.id}`, {
                    tournamentData: { tournamentData },
                  })
                }
              >
                <TournamentRow tournamentData={tournamentData} index={index} />
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={5}
                count={tournamentList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TournamentListTable;
