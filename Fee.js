import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Fee = () => {
  const [fees, setFees] = useState([]);
  const [newFee, setNewFee] = useState({ category: '', amount: '' });
  const [editFee, setEditFee] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/fees')
      .then(response => setFees(response.data))
      .catch(error => {
        console.error('Error fetching fees:', error);
        setSnackbarMessage('Error fetching fees.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  }, []);

  const handleAddFee = () => {
    axios.post('http://localhost:8080/api/fees', newFee)
      .then(response => {
        setFees([...fees, response.data]);
        setNewFee({ category: '', amount: '' });
        setSnackbarMessage('Fee added successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error adding fee:', error);
        setSnackbarMessage('Error adding fee.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleUpdateFee = () => {
    axios.put(`http://localhost:8080/api/fees/${editFee.id}`, editFee)
      .then(response => {
        setFees(fees.map(fee => fee.id === editFee.id ? response.data : fee));
        setEditFee(null);
        setSnackbarMessage('Fee updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error updating fee:', error);
        setSnackbarMessage('Error updating fee.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleDeleteFee = id => {
    axios.delete(`http://localhost:8080/api/fees/${id}`)
      .then(() => {
        setFees(fees.filter(fee => fee.id !== id));
        setSnackbarMessage('Fee deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error deleting fee:', error);
        setSnackbarMessage('Error deleting fee.');
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
        Manage Fees
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
          label="Category"
          value={newFee.category}
          onChange={(e) => setNewFee({ ...newFee, category: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Amount"
          value={newFee.amount}
          onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" size="large" onClick={handleAddFee}>
          Add Fee
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fees.map(fee => (
              <TableRow key={fee.id}>
                <TableCell>{fee.category}</TableCell>
                <TableCell>{fee.amount}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => handleDeleteFee(fee.id)}
                    style={{ marginRight: '10px' }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setEditFee(fee)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editFee && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Edit Fee
          </Typography>
          <TextField
            label="Category"
            value={editFee.category}
            onChange={(e) => setEditFee({ ...editFee, category: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Amount"
            value={editFee.amount}
            onChange={(e) => setEditFee({ ...editFee, amount: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleUpdateFee}
          >
            Update Fee
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

export default Fee;
