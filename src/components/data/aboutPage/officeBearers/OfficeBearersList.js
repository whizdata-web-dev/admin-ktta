import React, { useEffect, useState } from 'react';
import { db } from '../../../config/fbConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
import OfficeBearersTab from './OfficeBearersTab';

const OfficeBearersList = () => {
  const [membersList, setMembersList] = useState([]);
  const [downloadToken, setDownloadToken] = useState('');

  useEffect(() => {
    const MembersQuery = query(collection(db, 'officebearers'));
    const unsub = onSnapshot(MembersQuery, (querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach((doc) => {
        let memberData = { ...doc.data(), id: doc.id };
        const url =
          'https://firebasestorage.googleapis.com/v0/b/ttoneapp.appspot.com/o/officebearers%2F';
        const personName = memberData.image.substring(14);

        const getStorageData = async () => {
          fetch(url + personName)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              memberData.image = `${url + personName}?alt=media&token=${
                data.downloadTokens
              }`;
              setDownloadToken(data.downloadTokens);
            });
        };
        getStorageData();
        tempData.push(memberData);
      });
      setMembersList(tempData);
    });
    return () => unsub();
  }, []);

  return (
    <>
      <OfficeBearersTab membersList={membersList} />
    </>
  );
};

export default OfficeBearersList;
