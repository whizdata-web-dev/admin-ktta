import React, { useState } from "react";
import {
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Alert,
  TextField,
} from "@mui/material";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

import { db, storage } from "../../../config/fbConfig";
// import { ref, uploadBytes, updateMetadata } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";

const AddOfficeBearer = () => {
  const [officeBearerData, setOfficeBearerData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    address: "",
    image: "",
  });
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleError = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (image && officeBearerData.name && officeBearerData.designation) {
      const metaData = {
        contentType: image.type,
      };

      const storage = getStorage();

      const storageRef = ref(
        storage,
        `officebearers/${officeBearerData.name.replace(/\s/g, "")}.${image.name
          .split(".")
          .pop()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image, metaData);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setSuccess((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(db, "officebearers"), {
              ...officeBearerData,
              image: downloadURL,
            }).then(() => {
              setSuccess("Successful!");
              setTimeout(() => {
                setSuccess("");
                window.location.reload();
              }, 4000);
            });
          });
        }
      );
    }
  }

  return (
    <Box sx={{ minWidth: 200, maxWidth: 350, margin: "1rem" }}>
      <Card variant='outlined'>
        <CardContent>
          <h2 style={{ textAlign: "center" }}>Add Office Bearer</h2>
          {success && <Alert severity='success'>{success}</Alert>}
          {error && <Alert severity='error'>{error}</Alert>}
          <Divider />
          <form>
            <div style={{ margin: "1rem" }}>
              <input
                type='file'
                accept='image/*'
                onChange={(event) => setImage(event.target.files[0])}
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  padding: "1rem",
                  maxWidth: 200,
                }}
              />
            </div>
            <div style={{ margin: "1rem" }}>
              <TextField
                fullWidth
                id='name'
                type='text'
                value={officeBearerData.name}
                onChange={(event) =>
                  setOfficeBearerData({
                    ...officeBearerData,
                    [event.target.id]: event.target.value,
                  })
                }
                label='Name'
              />
            </div>
            <div style={{ margin: "1rem" }}>
              <TextField
                fullWidth
                id='designation'
                type='text'
                value={officeBearerData.designation}
                onChange={(event) =>
                  setOfficeBearerData({
                    ...officeBearerData,
                    [event.target.id]: event.target.value,
                  })
                }
                label='Designation'
              />
            </div>
            <div style={{ margin: "1rem" }}>
              <TextField
                fullWidth
                id='phone'
                type='tel'
                value={officeBearerData.phone}
                onChange={(event) =>
                  setOfficeBearerData({
                    ...officeBearerData,
                    [event.target.id]: event.target.value,
                  })
                }
                label='Phone'
              />
            </div>
            <div style={{ margin: "1rem" }}>
              <TextField
                fullWidth
                id='email'
                type='email'
                value={officeBearerData.email}
                onChange={(event) =>
                  setOfficeBearerData({
                    ...officeBearerData,
                    [event.target.id]: event.target.value,
                  })
                }
                label='Email'
              />
            </div>
            <div style={{ margin: "1rem" }}>
              <TextField
                fullWidth
                id='address'
                type='text'
                value={officeBearerData.address}
                onChange={(event) =>
                  setOfficeBearerData({
                    ...officeBearerData,
                    [event.target.id]: event.target.value,
                  })
                }
                label='Address'
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddOfficeBearer;
