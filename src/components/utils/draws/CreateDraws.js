import { useState } from 'react';
import Papa from 'papaparse';
import { Alert, Button } from '@mui/material';
import { db } from '../../config/fbConfig';
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useLocation, useHistory, withRouter } from 'react-router-dom';

const CreateDraws = (props) => {
  const history = useHistory();
  const location = useLocation();
  const fullPath = location.pathname.split('/').splice(2);
  const { tournamentDetails } = location;
  const fileName = fullPath.length ? fullPath[1] : '';
  const [fileData, setFileData] = useState(null);
  const [success, setSuccess] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async () => {
    await updateDoc(doc(db, 'tournaments', `${tournamentDetails.id}`), {
      events: arrayUnion({
        name: fileName,
        draws: fileData,
      }),
    }).then(() => {
      setSuccess('Tournament Successfully added!');
      setFileData('');
      setTimeout(() => {
        setDisabled(true);
        setSuccess('');
        history.goBack();
      }, 4000);
    });
  };

  return (
    <div>
      {success && <Alert severity='success'>{success}</Alert>}
      <input
        disabled={disabled}
        type='file'
        accept='.csv'
        onChange={(e) => {
          const files = e.target.files;
          if (files.length) {
            Papa.parse(files[0], {
              complete: function (results) {
                let tempData = results.data;
                tempData.pop();
                const drawsData = tempData.map((playerData, index) => {
                  return {
                    playerName: playerData[0],
                    academyName: playerData[1],
                  };
                });
                setFileData(drawsData);
              },
            });
          }
        }}
      />
      <Button
        variant='contained'
        type='submit'
        disabled={disabled}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default withRouter(CreateDraws);
