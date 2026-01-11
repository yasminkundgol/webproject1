import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [newTimetable, setNewTimetable] = useState({ day: '', time: '', subject: '' });
  const [editTimetable, setEditTimetable] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/timetables')
      .then(response => setTimetables(response.data))
      .catch(error => {
        console.error('Error fetching timetables:', error);
        setSnackbarMessage('Error fetching timetables.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  }, []);

  const handleAddTimetable = () => {
    axios.post('http://localhost:8080/api/timetables', newTimetable)
      .then(response => {
        setTimetables([...timetables, response.data]);
        setNewTimetable({ day: '', time: '', subject: '' });
        setSnackbarMessage('Timetable added successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error adding timetable:', error);
        setSnackbarMessage('Error adding timetable.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleUpdateTimetable = () => {
    axios.put(`http://localhost:8080/api/timetables/${editTimetable.id}`, editTimetable)
      .then(response => {
        setTimetables(timetables.map(timetable => timetable.id === editTimetable.id ? response.data : timetable));
        setEditTimetable(null);
        setSnackbarMessage('Timetable updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error updating timetable:', error);
        setSnackbarMessage('Error updating timetable.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleDeleteTimetable = id => {
    axios.delete(`http://localhost:8080/api/timetables/${id}`)
      .then(() => {
        setTimetables(timetables.filter(timetable => timetable.id !== id));
        setSnackbarMessage('Timetable deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error deleting timetable:', error);
        setSnackbarMessage('Error deleting timetable.');
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
        Manage Timetables
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
          label="Day"
          value={newTimetable.day}
          onChange={(e) => setNewTimetable({ ...newTimetable, day: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Time"
          value={newTimetable.time}
          onChange={(e) => setNewTimetable({ ...newTimetable, time: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Subject"
          value={newTimetable.subject}
          onChange={(e) => setNewTimetable({ ...newTimetable, subject: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" size="large" onClick={handleAddTimetable}>
          Add Timetable
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timetables.map(timetable => (
              <TableRow key={timetable.id}>
                <TableCell>{timetable.day}</TableCell>
                <TableCell>{timetable.time}</TableCell>
                <TableCell>{timetable.subject}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => handleDeleteTimetable(timetable.id)}
                    style={{ marginRight: '10px' }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setEditTimetable(timetable)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editTimetable && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Edit Timetable
          </Typography>
          <TextField
            label="Day"
            value={editTimetable.day}
            onChange={(e) => setEditTimetable({ ...editTimetable, day: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Time"
            value={editTimetable.time}
            onChange={(e) => setEditTimetable({ ...editTimetable, time: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Subject"
            value={editTimetable.subject}
            onChange={(e) => setEditTimetable({ ...editTimetable, subject: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleUpdateTimetable}
          >
            Update Timetable
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

export default Timetable;
