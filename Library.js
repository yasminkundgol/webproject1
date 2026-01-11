import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ bookTitle: '', author: '' });
  const [editBook, setEditBook] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/libraries')
      .then(response => setBooks(response.data))
      .catch(error => {
        console.error('Error fetching books:', error);
        setSnackbarMessage('Error fetching books.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  }, []);

  const handleAddBook = () => {
    axios.post('http://localhost:8080/api/libraries', newBook)
      .then(response => {
        setBooks([...books, response.data]);
        setNewBook({ bookTitle: '', author: '' });
        setSnackbarMessage('Book added successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error adding book:', error);
        setSnackbarMessage('Error adding book.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleUpdateBook = () => {
    axios.put(`http://localhost:8080/api/libraries/${editBook.id}`, editBook)
      .then(response => {
        setBooks(books.map(book => book.id === editBook.id ? response.data : book));
        setEditBook(null);
        setSnackbarMessage('Book updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error updating book:', error);
        setSnackbarMessage('Error updating book.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleDeleteBook = id => {
    axios.delete(`http://localhost:8080/api/libraries/${id}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
        setSnackbarMessage('Book deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error deleting book:', error);
        setSnackbarMessage('Error deleting book.');
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
        Manage Libraries
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
          label="Book Title"
          value={newBook.bookTitle}
          onChange={(e) => setNewBook({ ...newBook, bookTitle: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" size="large" onClick={handleAddBook}>
          Add Book
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(book => (
              <TableRow key={book.id}>
                <TableCell>{book.bookTitle}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => handleDeleteBook(book.id)}
                    style={{ marginRight: '10px' }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setEditBook(book)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editBook && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Edit Book
          </Typography>
          <TextField
            label="Book Title"
            value={editBook.bookTitle}
            onChange={(e) => setEditBook({ ...editBook, bookTitle: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Author"
            value={editBook.author}
            onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleUpdateBook}
          >
            Update Book
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

export default Library;
