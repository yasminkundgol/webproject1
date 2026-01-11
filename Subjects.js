import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ name: '', code: '' });
  const [editSubject, setEditSubject] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/subjects')
      .then(response => setSubjects(response.data))
      .catch(error => console.error('Error fetching subjects:', error));
  }, []);

  const handleAddSubject = () => {
    axios.post('http://localhost:8080/api/subjects', newSubject)
      .then(response => {
        setSubjects([...subjects, response.data]);
        setNewSubject({ name: '', code: '' });
        setSnackbarMessage('Subject added successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error adding subject:', error);
        setSnackbarMessage('Error adding subject.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleUpdateSubject = () => {
    axios.put(`http://localhost:8080/api/subjects/${editSubject.id}`, editSubject)
      .then(response => {
        setSubjects(subjects.map(subject => subject.id === editSubject.id ? response.data : subject));
        setEditSubject(null);
        setSnackbarMessage('Subject updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error updating subject:', error);
        setSnackbarMessage('Error updating subject.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleDeleteSubject = id => {
    axios.delete(`http://localhost:8080/api/subjects/${id}`)
      .then(() => {
        setSubjects(subjects.filter(subject => subject.id !== id));
        setSnackbarMessage('Subject deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error deleting subject:', error);
        setSnackbarMessage('Error deleting subject.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Subjects
      </Typography>
      
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleHomeClick}
        style={{ margin: '20px 0' }}
      >
        Back to Home
      </Button>

      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Name"
          value={newSubject.name}
          onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Code"
          value={newSubject.code}
          onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" size="large" onClick={handleAddSubject}>
          Add Subject
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map(subject => (
              <TableRow key={subject.id}>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.code}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => handleDeleteSubject(subject.id)}
                    style={{ marginRight: '10px' }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setEditSubject(subject)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editSubject && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Edit Subject
          </Typography>
          <TextField
            label="Name"
            value={editSubject.name}
            onChange={(e) => setEditSubject({ ...editSubject, name: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Code"
            value={editSubject.code}
            onChange={(e) => setEditSubject({ ...editSubject, code: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleUpdateSubject}
          >
            Update Subject
          </Button>
        </div>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Subject;
