import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', salary: '' });
  const [editTeacher, setEditTeacher] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/teachers')
      .then(response => setTeachers(response.data))
      .catch(error => {
        console.error('Error fetching teachers:', error);
        setSnackbarMessage('Error fetching teachers.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  }, []);

  const handleAddTeacher = () => {
    axios.post('http://localhost:8080/api/teachers', newTeacher)
      .then(response => {
        setTeachers([...teachers, response.data]);
        setNewTeacher({ name: '', subject: '', salary: '' });
        setSnackbarMessage('Teacher added successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error adding teacher:', error);
        setSnackbarMessage('Error adding teacher.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleUpdateTeacher = () => {
    axios.put(`http://localhost:8080/api/teachers/${editTeacher.id}`, editTeacher)
      .then(response => {
        setTeachers(teachers.map(teacher => teacher.id === editTeacher.id ? response.data : teacher));
        setEditTeacher(null);
        setSnackbarMessage('Teacher updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error updating teacher:', error);
        setSnackbarMessage('Error updating teacher.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleDeleteTeacher = id => {
    axios.delete(`http://localhost:8080/api/teachers/${id}`)
      .then(() => {
        setTeachers(teachers.filter(teacher => teacher.id !== id));
        setSnackbarMessage('Teacher deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error deleting teacher:', error);
        setSnackbarMessage('Error deleting teacher.');
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
        Manage Teachers
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
          value={newTeacher.name}
          onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Subject"
          value={newTeacher.subject}
          onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Salary"
          value={newTeacher.salary}
          onChange={(e) => setNewTeacher({ ...newTeacher, salary: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" size="large" onClick={handleAddTeacher}>
          Add Teacher
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map(teacher => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.salary}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    style={{ marginRight: '10px' }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setEditTeacher(teacher)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editTeacher && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Edit Teacher
          </Typography>
          <TextField
            label="Name"
            value={editTeacher.name}
            onChange={(e) => setEditTeacher({ ...editTeacher, name: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Subject"
            value={editTeacher.subject}
            onChange={(e) => setEditTeacher({ ...editTeacher, subject: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Salary"
            value={editTeacher.salary}
            onChange={(e) => setEditTeacher({ ...editTeacher, salary: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleUpdateTeacher}
          >
            Update Teacher
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

export default Teacher;
